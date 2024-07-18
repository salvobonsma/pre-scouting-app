import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ArrowDown, ArrowUp} from "lucide-react";

export default function NumberInput({id, initialValue, min, max, onChange}: {
    id?: string
    initialValue: number,
    min?: number,
    max?: number,
    onChange: (value: number) => void
}) {
    const [value, setValue] = useState(initialValue);

    min = min ?? Number.NEGATIVE_INFINITY;
    max = max ?? Number.POSITIVE_INFINITY;

    return (
          <div className={"flex gap-2"}>
              <Input className={"flex-1"} value={value.toFixed()} onChange={event => {
                  let value = Number.parseInt(event.target.value);
                  if (event.target.value === "") value = 0;
                  if (isNaN(value) || value < min || value > max) {
                      console.log("test")
                      event.preventDefault();
                      return;
                  }
                  setValue(value);
                  onChange(value);
              }} type={"number"} id={id}/>
              <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => {
                        setValue(Math.max(value - 1, min));
                        onChange(Math.max(value - 1, min));
                    }}
              ><ArrowDown/></Button>
              <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => {
                        setValue(Math.max(value + 1, min));
                        onChange(Math.max(value + 1, min));
                    }}
              ><ArrowUp/></Button>
          </div>
    );
}