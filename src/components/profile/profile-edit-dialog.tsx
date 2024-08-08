"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProfileEditForm from "./profile-edit-form"
import { useState } from "react"
import { IUserProfile } from "@/actions/profile/fetch-profile"

interface ComponentProps {
  profile: IUserProfile
}

const ProfileEditDialog = ({ profile }: ComponentProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [profileData, setProfileData] = useState(profile) // Persistent data on dialog re-open

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Be careful, your data will be used for the certificates upon course completion. Once the certificate is generated, the certificate data cannot be changed.
          </DialogDescription>
        </DialogHeader>
        <ProfileEditForm profile={profileData} onProfileUpdate={setProfileData} onSuccessfulCallback={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default ProfileEditDialog