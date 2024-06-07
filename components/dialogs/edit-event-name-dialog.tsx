'use client'

import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CardContent, CardFooter} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dispatch, SetStateAction} from "react";
import EditEventName from "@/lib/database/edit-event-name";

export default function EditEventNameDialog(props: {
    id: number,
    name: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}) {
    const editEventSchema = z.object({
        name: z.string()
              .trim()
              .min(3, "Name must be greater than 2 characters.")
              .max(49, "Name must be less than 50 characters.")
    })

    const form = useForm<z.infer<typeof editEventSchema>>({
        resolver: zodResolver(editEventSchema),
        defaultValues: {
            name: props.name
        }
    });

    async function onSubmit(data: z.infer<typeof editEventSchema>) {
        const response = await EditEventName(props.id, data.name);
        if (!response) return;

        if (response.success) {
            window.location.reload();
            return;
        }

        form.setError("name", {message: response.message});
    }

    return (
          <Dialog open={props.open} onOpenChange={props.setOpen}>
              <DialogContent>
                  <DialogHeader>Edit Event Name</DialogHeader>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className={"mt-2"} autoComplete={"off"}>
                          <CardContent className={"formContent"}>
                              <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                          <FormItem className={"formItem"}>
                                              <FormLabel>Name</FormLabel>
                                              <FormControl>
                                                  <Input type={"text"} {...field} />
                                              </FormControl>
                                              <FormMessage/>
                                          </FormItem>
                                    )}
                              />
                          </CardContent>
                          <CardFooter className={"flex justify-end"}>
                              <Button type={"submit"}>Edit</Button>
                          </CardFooter>
                      </form>
                  </Form>
              </DialogContent>
          </Dialog>
    )
}