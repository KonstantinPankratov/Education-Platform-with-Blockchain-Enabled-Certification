"use client"

import { SendTransactionRequest, TonConnectButton, TonConnectUI, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Button } from '../ui/button'
import { IUserCourse } from '@/db/models/UserCourse'
import { Address, toNano } from '@ton/core'
import { createIssueCertificatePayload, setCourseCertificateAddress, setCourseCertificateIssuedAt } from '@/actions/course/auth/issue-course-certificate'
import { TonClient } from '@ton/ton'
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
      checkCertificate(enrollment);
    }
  }, [enrollment]);

  const issueCertificateCallback = () => {
    setStatus("requested");
    checkCertificate(enrollment);
  }

  let description = 'Congratulations! You are now eligible for a certificate. The certificate will be issued on the TON blockchain, so you will need a custodial or non-custodial wallet that supports TON cryptocurrency.'

  if (walletAddress) {
    description = 'Great, your wallet is connected, it will be used to initialize the transaction to issue the certificate, you will see the details of the transaction - cost and gas fee - in your wallet upon confirmation.';
  }

  if (status === 'requested') {
    description = 'The certificate has been successfully requested, now we have to wait for the transaction to be processed in the blockchain, it may take some time, but usually not longer than a couple of seconds.'
  }

  if (status === 'ready') {
    description = 'Yay, your certificate has been issued, now you can share the link to your certificate!'
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
        {walletAddress && status === 'idle' && <Button className='w-full' onClick={() => { issueCertificate(enrollment, tonConnectUI, issueCertificateCallback) }}>Request certificate</Button>}
        {status === 'requested' && <Button className='w-full' disabled>Waiting for certificate...</Button>}
        {status === 'ready' && <Button className='w-full' asChild variant="default"><Link href={`/certificate/${enrollment.certificateTonAddress}`}>View certificate</Link></Button>}
      </CardFooter>
    </Card>
  )
}

const checkCertificate = async (enrollment: IUserCourse) => {
  const tonClient = new TonClient({ endpoint: process.env.NEXT_PUBLIC_TON_NET! });

  const userId = enrollment.userId.toString()
  const courseId = enrollment.courseId.toString()
  const certificateAddress = enrollment.certificateTonAddress

  tonClient.runMethod(
    Address.parse(certificateAddress),
    'details'
  ).then(details => {
    try {
      const fetchedCourseId = details.stack.readString();
      const fetchedUserId = details.stack.readString();

      if (fetchedCourseId !== courseId || fetchedUserId !== userId) {
        throw new Error('Certificate is not yet ready')
      }

      setCourseCertificateIssuedAt(userId, courseId);
    } catch (error: any) {
      setTimeout(() => {
        checkCertificate(enrollment)
      }, 5000);
    }
  });
}

const issueCertificate = async (enrollment: IUserCourse, tonConnectUI: TonConnectUI, callback: () => void) => {
  try {
    const userId = enrollment.userId.toString()
    const courseId = enrollment.courseId.toString()

    const message = {
      address: Address.parse(process.env.NEXT_PUBLIC_TON_CERTIFICATE_ISSUER_ADDRESS!).toString(),
      amount: toNano("0.2").toString(),
      payload: await createIssueCertificatePayload(userId, courseId) // TODO inc security vuln
    };

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        message
      ]
    } as SendTransactionRequest

    tonConnectUI.sendTransaction(transaction).then(() => {
      setCourseCertificateAddress(userId, courseId)
      callback()
    })
  } catch (error: any) {
    console.log(error)
  }
}

export default TonCertification