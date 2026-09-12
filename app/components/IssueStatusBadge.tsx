"use client";

import React, { useEffect, useState } from "react";
import { Status } from "../generated/prisma/client";
import { Badge, DropdownMenu } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const statusValues = Object.values(Status) as Status[];

interface Props {
  status: Status;
  issueId?: number;
}

const IssueStatusBadge = ({ status, issueId }: Props) => {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const updateStatus = async (newStatus: Status) => {
    if (!issueId || newStatus === currentStatus) return;

    setIsUpdating(true);

    try {
      await axios.patch(`/api/issues/${issueId}/statusChange`, {
        status: newStatus,
      });

      setCurrentStatus(newStatus);
      toast.success("Status updated.");
      router.refresh();
    } catch (error) {
      console.error("Error updating issue status:", error);
      toast.error("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const badge = (
    <Badge color={statusMap[currentStatus].color}>
      {statusMap[currentStatus].label}
    </Badge>
  );

  if (!issueId) return badge;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={isUpdating}>
        <button
          type="button"
          className="inline-flex cursor-pointer border-0 bg-transparent p-0 disabled:cursor-wait"
          aria-label={`Change status from ${statusMap[currentStatus].label}`}
        >
          {badge}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Status</DropdownMenu.Label>
        <DropdownMenu.RadioGroup
          value={currentStatus}
          onValueChange={(value) => updateStatus(value as Status)}
        >
          {statusValues.map((status) => (
            <DropdownMenu.RadioItem
              key={status}
              value={status}
              disabled={isUpdating}
            >
              {statusMap[status].label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default IssueStatusBadge;
