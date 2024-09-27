"use server"

import dbConnect from "@/db/dbConnect"
import UserCourse from "@/db/models/UserCourse";
import { Address, beginCell } from "@ton/core";
import { TonClient, TupleBuilder } from "@ton/ton";

export const createIssueCertificatePayload = (userId: string, courseId: string) => {
  const forwardPayload = beginCell()
    .storeUint(0, 32) // 0 opcode of 32bits fpr comments
    .storeStringTail('Issuing new certificate!')
    .endCell();

  const cell = beginCell()
    .storeUint(253293831, 32) // check opcode for issue certificate in build contract
    .storeStringRefTail(courseId)
    .storeStringRefTail(userId)
    // .storeRef(forwardPayload)
    .endCell();

  return cell.toBoc().toString("base64");
}

export const createIssueCertificateMessage = () => {
  const cell = beginCell()
    .storeUint(0, 32)
    .storeStringRefTail('Issuing new certificate!')
    .endCell();

  return cell.toBoc().toString("base64");
}

const fetchCertificateAddress = async (userId: string, courseId: string) => {
  const tonClient = new TonClient({ endpoint: process.env.NEXT_PUBLIC_TON_NET! });

  const args = new TupleBuilder();
  args.writeString(courseId);
  args.writeString(userId);

  const address = await tonClient.runMethod(
    Address.parse(process.env.NEXT_PUBLIC_TON_CERTIFICATE_ISSUER_ADDRESS!),
    'certificateAddress',
    args.build()
  );

  return address.stack.readAddress();
}

export const setCourseCertificateAddress = async (userId: string, courseId: string) => {
  await dbConnect()

  const enrollment = await UserCourse.findOne({ userId: userId, courseId: courseId })

  if (!enrollment) {
    throw new Error('You are not enrolled in this course')
  }

  enrollment.certificateTonAddress = (await fetchCertificateAddress(userId, courseId)).toString()
  enrollment.certificateRequestedAt = new Date()
  enrollment.save()
}

export const setCourseCertificateIssuedAt = async (userId: string, courseId: string) => {
  await dbConnect()

  const enrollment = await UserCourse.findOne({ userId: userId, courseId: courseId })

  if (!enrollment) {
    throw new Error('You are not enrolled in this course')
  }

  enrollment.certificateIssuedAt = new Date()
  enrollment.save()
}