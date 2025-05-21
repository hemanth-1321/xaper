"use client";
import React, { useEffect, useState } from "react";
import { Zap } from "@/lib/types";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const [zaps, setZaps] = useState<Zap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchZaps() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/zap`, {
          headers: {
            Authorization: token,
          },
        });

        setZaps(response.data.zaps);
      } catch (error) {
        console.error("Error fetching zaps:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchZaps();
  }, []);

  return (
    <div className="p-4 space-y-4 max-w-5xl mx-auto mt-28">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Your Zaps</h1>
        <Button size="sm" className="cursor-pointer">
          <Link href={"/create/xap"}>Create</Link>
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="text-sm">
              <TableHead className="w-1/4">Trigger Name</TableHead>
              <TableHead className="w-1/4">Trigger Id</TableHead>
              <TableHead className="w-1/4">Actions</TableHead>
              <TableHead className="w-1/4">Go</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-10" />
                    </TableCell>
                  </TableRow>
                ))
              : zaps.map((zap) => (
                  <TableRow key={zap.id} className="text-sm">
                    <TableCell className="flex items-center space-x-2">
                      {zap.trigger.type.image && (
                        <img
                          src={zap.trigger.type.image}
                          alt={zap.trigger.type.name}
                          className="w-10 h-6 rounded"
                        />
                      )}
                      <span>{zap.trigger.type.name}</span>
                    </TableCell>
                    <TableCell>{zap.trigger.triggerId}</TableCell>
                    <TableCell>
                      <ul className="list-disc ml-4 space-y-1">
                        {zap.Action.map((action) => (
                          <li
                            key={action.id}
                            className="flex items-center space-x-2"
                          >
                            {action.type.image && (
                              <img
                                src={action.type.image}
                                alt={action.type.name}
                                className="w-5 h-5 rounded"
                              />
                            )}
                            <span>{action.type.name}</span>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/zap/${zap.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        GO
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

    {/* Mobile Cards */}
<div className="md:hidden space-y-4">
  {loading ? (
    Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="border p-4 rounded-lg shadow-md space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))
  ) : (
    zaps.map((zap) => (
      <div
        key={zap.id}
        className="border rounded-lg p-4 shadow-md space-y-3 bg-white"
      >
        <div className="flex items-center space-x-2">
          {zap.trigger.type.image && (
            <img
              src={zap.trigger.type.image}
              alt={zap.trigger.type.name}
              className="w-6 h-6 rounded"
            />
          )}
          <span className="font-semibold text-base">
            {zap.trigger.type.name}
          </span>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-medium">Trigger ID:</span>{" "}
          {zap.trigger.triggerId}
        </p>

        <div>
          <p className="font-medium text-sm mb-1">Actions:</p>
          <ul className="ml-4 list-disc space-y-1 text-sm text-gray-800">
            {zap.Action.map((action) => (
              <li key={action.id} className="flex items-center space-x-2">
                {action.type.image && (
                  <img
                    src={action.type.image}
                    alt={action.type.name}
                    className="w-5 h-5 rounded"
                  />
                )}
                <span>{action.type.name}</span>
              </li>
            ))}
          </ul>
        </div>

       <Button className="w-full"> <Link
          href={`/zap/${zap.id}`}
          className="inline-block text-center w-full text-sm font-medium  rounded py-2"
        >
          GO
        </Link></Button>
      </div>
    ))
  )}
</div>

    </div>
  );
}
