"use client"

import { SendTransactionRequest, TonConnectButton, TonConnectUI, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Button } from '../ui/button'
import { IUserCourse } from '@/db/models/UserCourse'
import { Address, toNano } from '@ton/core'
import { createIssueCertificatePayload, setCourseCertificateAddress, setCourseCertificateIssuedAt } from '@/actions/course/auth/issue-course-certificate'
import { TonClient, Cell } from '@ton/ton'
import { useEffect, useState } from 'react'
import { Award, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'

interface ComponentProps {
  enrollment: IUserCourse
}

type TStatus = "idle" | "requested" | "ready"

const TonCertification = ({ enrollment }: ComponentProps) => {
  const walletAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const [status, setStatus] = useState<TStatus>("idle")

  useEffect(() => {
    if (enrollment.certificateIssuedAt) {
      setStatus("ready")
    } else if (enrollment.certificateRequestedAt) {
      setStatus("requested")
    }
    if (enrollment.certificateRequestedAt && enrollment.certificateTonAddress && !enrollment.certificateIssuedAt) {
      checkCertificate(enrollment)
    }
  }, [enrollment])

  const issueCertificateCallback = () => {
    setStatus("requested")
    checkCertificate(enrollment)
  }

  const test = async () => {

    const tonClient = new TonClient({ endpoint: process.env.NEXT_PUBLIC_TON_NET! })

    const transaction = await tonClient.getTransaction(Address.parse(enrollment.certificateTonAddress), '2n', BocToHex())

    console.log(transaction)
  }

  let description

  switch (status) {
    case 'requested':
      description = 'The certificate has been successfully requested, now we have to wait for the transaction to be processed in the blockchain, it may take some time, but usually not longer than a couple of seconds.'
      break
    case 'ready':
      description = 'Yay, your certificate has been issued, now you can view it & share it!'
      break
    default:
      if (walletAddress) {
        description = 'Great, your wallet is connected, it will be used to initialize the transaction to issue the certificate, you will see the details of the transaction - cost and gas fee - in your wallet upon confirmation.'
      } else {
        description = 'Congratulations! You are now eligible for a certificate. The certificate will be issued on the TON blockchain, so you will need a custodial or non-custodial wallet that supports TON cryptocurrency.'
      }
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
          <Button onClick={test}>Test</Button>
        </div>
      </CardContent>
      <CardFooter>
        {walletAddress && status === 'idle' && <Button className='w-full' onClick={() => { issueCertificate(enrollment, tonConnectUI, issueCertificateCallback) }}>Request certificate</Button>}
        {status === 'requested' && <Button className='w-full' disabled>Waiting for certificate...</Button>}
        {status === 'ready' && <Button className='w-full' asChild variant="default"><Link href={`/certificate/${enrollment.certificateTonAddress}`}>View certificate</Link></Button>}
      </CardFooter>
    </Card>
  )
}

const checkCertificate = async (enrollment: IUserCourse) => {
  const tonClient = new TonClient({ endpoint: process.env.NEXT_PUBLIC_TON_NET! })

  const userId = enrollment.userId.toString()
  const courseId = enrollment.courseId.toString()
  const certificateAddress = enrollment.certificateTonAddress

  const retryDelay = 5000

  const checkDeployment = async () => {
    const isDeployed = await tonClient.isContractDeployed(Address.parse(certificateAddress))

    if (isDeployed) {
      setCourseCertificateIssuedAt(userId, courseId)
    } else {
      setTimeout(checkDeployment, retryDelay)
    }
  }

  checkDeployment()
}

const issueCertificate = async (enrollment: IUserCourse, tonConnectUI: TonConnectUI, callback: () => void) => {
  try {
    const userId = enrollment.userId.toString()
    const courseId = enrollment.courseId.toString()

    const message = {
      address: Address.parse(process.env.NEXT_PUBLIC_TON_CERTIFICATE_ISSUER_ADDRESS!).toString(),
      amount: toNano("0.2").toString(),
      payload: await createIssueCertificatePayload(userId, courseId) // TODO inc security vuln
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        message
      ]
    } as SendTransactionRequest

    tonConnectUI.sendTransaction(transaction).then(({ boc }) => {
      setCourseCertificateAddress(userId, courseId)
      callback()
    })
  } catch (error: any) {
    console.log(error)
  }
}

const BocToHex = (boc: string = "te6cckEBBgEA8QAB5YgBJfVmJjGRnxNMO/K+rYQkutDAXCqYqNnf1aB7w68nrbgDm0s7c////+s3k79oAAAA9A9Kx4Pkih1zAP1NfxIRUaBq7jX/mk5DjKegXk1HZHkz8xBmpUP4frasaGCM0MNIchDnUNE2/7eDzgbnPoJAZAUBAgoOw8htAwUCAnBiACkADZjv6xPA6pp81wSCpn525XYXd5MbZVVfk3kirYOaoF9eEAAAAAAAAAAAAAAAAAAADxj1BwQDADA2NmEzNjZmNjgyY2VlYTAzZTMzYTJhOTgAMDY2NzQyYjA3MDQ3OTJmODMzMTY1YWY3MwAAUOjIxw==") => {
  const cell = Cell.fromBase64(boc)
  const buffer = cell.hash();
  return buffer.toString('hex');
}

export default TonCertification