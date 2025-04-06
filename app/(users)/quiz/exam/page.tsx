"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  //   CardTitle,
} from "@/components/ui/card";
// shadcnirad

import { Button } from "@/components/ui/button";

export default function ExamPage() {
  return (
    <>
      <div className="border-b-2 border-black pb-3 text-2xl mb-4">CPG 101</div>
      <Card className="bg-grad">
        <CardHeader>
          {/* <CardTitle>Card Title</CardTitle> */}
          <CardDescription>
            <div className="flex items-center justify-start ">
              <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm font-medium mr-4">
                {1}
              </div>
              <span className="inline-block max-h-30 overflow-scroll">
                For an OD line, formal notice to the customer is not required if
                the line is to be canceled, frozen, or the account closed.
                Unilateral decision, if not properly communicated, may expose
                the Bank to litigation. For account closure
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white dark:bg-black">
          <div className="p-4">
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      <div className="md:flex justify-between w-full items-center space-y-3 md:space-y-0 mt-4 mb-12 ">
        <div className="cursor-pointer active:translate-y-1">
          Check Answer{" "}
          <span
            className="inline-flex items-center bg-green-700 text-white justify-center rounded-full border w-6 h-6 font-bold"
            style={{ rotate: "-125deg" }}
          >
            Γ
          </span>
        </div>
        <div className="flex gap-2 ">
          <Button
            variant={"outline"}
            className=" dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white"
          >
            Back
          </Button>
          <Button className="bg-[#0f172a] hover:bg-[#1e293b] text-white dark:bg-[#0f172a] dark:hover:bg-[#1e293b] dark:text-white">
            Next
          </Button>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 h-10 bg-amber-300 w-full flex items-center justify-center">
        <div style={{ textShadow: '0px 0px 3px black' }}>
          <span className="font-bold">Answered:</span>0 of 6
        </div>
      </div>
    </>
  );
}

// export function RadioGroupDemo() {
//   return (

//   )
// }
