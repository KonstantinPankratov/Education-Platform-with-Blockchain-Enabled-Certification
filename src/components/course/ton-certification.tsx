"use client"

import { SendTransactionRequest, TonConnectButton, TonConnectUI, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Button } from '../ui/button'
import { IUserCourse } from '@/db/models/UserCourse'
import { Address, toNano } from '@ton/core'
import { createIssueCertificatePayload, setCourseCertificateAddress, setCourseCertificateIssuedAt } from '@/actions/course/auth/issue-course-certificate'
import { TonClient, Cell } from '@ton/ton'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Award, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import fetchUserEnrollment from '@/actions/user/enrollment/fetch-enrollment'
import { Skeleton } from '../ui/skeleton'

interface ComponentProps {
  userId: string
  courseId: string
}

type TStatus = "idle" | "requested" | "ready"

const TonCertification = ({ userId, courseId }: ComponentProps) => {
  const walletAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const [status, setStatus] = useState<TStatus>("idle")
  const [enrollment, setEnrollment] = useState<IUserCourse | null>(null)

  useEffect(() => {
    fetchUserEnrollment(userId, courseId).then((enrollment) => {
      setEnrollment(enrollment)
    })
  }, [userId, courseId])

  const checkCertificate = useCallback(async () => {
    if (!enrollment) {
      return
    }
    const tonClient = new TonClient({ endpoint: process.env.NEXT_PUBLIC_TON_NET! })

    const userId = enrollment.userId.toString()
    const courseId = enrollment.courseId.toString()
    const certificateAddress = enrollment.certificateTonAddress

    const retryDelay = 5000
    let retriesLeft = 10

    const checkDeployment = async () => {
      try {
        if (retriesLeft === 0) {
          return
        }

        const isDeployed = certificateAddress ? await tonClient.isContractDeployed(Address.parse(certificateAddress)) : false

        if (!isDeployed) {
          throw new Error('The certificate has not yet been deployed')
        }

        setCourseCertificateIssuedAt(userId, courseId).then(() => {
          fetchUserEnrollment(userId, courseId).then((enrollment) => {
            setEnrollment(enrollment)
          })
        })
      } catch (error: any) {
        console.error(error)
        setTimeout(checkDeployment, retryDelay)
      } finally {
        retriesLeft--
      }
    }

    checkDeployment()
  }, [enrollment])

  const issueCertificate = useCallback(async () => {
    try {
      if (!enrollment || !tonConnectUI || !walletAddress) {
        return
      }

      const userId = enrollment.userId.toString()
      const courseId = enrollment.courseId.toString()

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: Address.parse(process.env.NEXT_PUBLIC_TON_CERTIFICATE_ISSUER_ADDRESS!).toString(),
            amount: toNano("0.2").toString(),
            payload: await createIssueCertificatePayload(walletAddress, userId, courseId) // TODO inc security vuln
          }
        ]
      } as SendTransactionRequest

      tonConnectUI.sendTransaction(transaction).then(({ boc }) => {
        setCourseCertificateAddress(walletAddress, userId, courseId).then(() => {
          fetchUserEnrollment(userId, courseId).then((enrollment) => {
            setEnrollment(enrollment)
          })
        })
      })
    } catch (error: any) {
      console.log(error)
    }
  }, [enrollment, tonConnectUI, walletAddress])

  const description = useMemo(() => {
    switch (status) {
      case 'requested':
        return 'The certificate has been successfully requested, now we have to wait for the transaction to be processed in the blockchain, it may take some time, but usually not longer than a couple of seconds.'
      case 'ready':
        return 'Yay, your certificate has been issued, now you can view it & share it!'
      default:
        if (walletAddress) {
          return 'Great, your wallet is connected, it will be used to initialize the transaction to issue the certificate, you will see the details of the transaction - cost and gas fee - in your wallet upon confirmation.'
        } else {
          return 'Congratulations! You are now eligible for a certificate. The certificate will be issued on the TON blockchain, so you will need a wallet that supports TON cryptocurrency.'
        }
    }
  }, [status, walletAddress])

  useEffect(() => {
    if (!enrollment)
      return

    if (enrollment.certificateIssuedAt) {
      setStatus("ready")
    } else if (enrollment.certificateRequestedAt) {
      setStatus("requested")
    }
    if (enrollment.certificateRequestedAt && enrollment.certificateTonAddress && !enrollment.certificateIssuedAt) {
      checkCertificate()
    }
  }, [enrollment, userId, courseId, checkCertificate])

  if (!enrollment || !tonConnectUI) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-1'><Award className='size-6' />Certification</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex gap-2 items-center'>
            <Wallet className='size-5 shrink-0' />
            <span className='font-semibold text-base grow'>Your wallet</span>
            <Skeleton className='h-10 min-w-36' />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className='h-10 w-full' />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-1'><Award className='size-6' />Certification</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex gap-2 items-center'>
          <Wallet className='size-5 shrink-0' />
          <span className='font-semibold text-base grow'>Your wallet</span>
          <TonConnectButton></TonConnectButton>
        </div>
      </CardContent>
      <CardFooter>
        {walletAddress && status === 'idle' && <Button className='w-full' onClick={issueCertificate}>Request certificate</Button>}
        {status === 'requested' && <Button className='w-full' disabled>Waiting for certificate...</Button>}
        {status === 'ready' && <Button className='w-full' asChild variant="default"><Link href={`/certificate/${enrollment.certificateTonAddress}`}>View certificate</Link></Button>}
      </CardFooter>
    </Card>
  )
}

const BocToHex = (boc: string = "te6cckEBBgEA8QAB5YgBJfVmJjGRnxNMO/K+rYQkutDAXCqYqNnf1aB7w68nrbgDm0s7c////+s3k79oAAAA9A9Kx4Pkih1zAP1NfxIRUaBq7jX/mk5DjKegXk1HZHkz8xBmpUP4frasaGCM0MNIchDnUNE2/7eDzgbnPoJAZAUBAgoOw8htAwUCAnBiACkADZjv6xPA6pp81wSCpn525XYXd5MbZVVfk3kirYOaoF9eEAAAAAAAAAAAAAAAAAAADxj1BwQDADA2NmEzNjZmNjgyY2VlYTAzZTMzYTJhOTgAMDY2NzQyYjA3MDQ3OTJmODMzMTY1YWY3MwAAUOjIxw==") => {
  const cell = Cell.fromBase64(boc)
  const buffer = cell.hash();
  return buffer.toString('hex');
}

export default TonCertification