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
    <div className="p-4 space-y-2 max-w-5xl mx-auto mt-28">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Your Zaps</h1>
        <Button size="sm" className="cursor-pointer">
            <Link href={"/create/xap"}>Create</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
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
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  </TableRow>
                ))
              : zaps.map((zap) => (
                  <TableRow key={zap.id} className="text-sm">
                    <TableCell>{zap.trigger.type.name}</TableCell>
                    <TableCell>{zap.trigger.triggerId}</TableCell>
                    <TableCell>
                      <ul className="list-disc ml-4">
                        {zap.Action.map((action) => (
                          <li key={action.id}>{action.type.name}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Link href={`/zap/${zap.id}`}>GO</Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
