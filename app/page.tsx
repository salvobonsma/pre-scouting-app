'use client'

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CardContent, CardFooter} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

export default function Home() {
    const newEventSchema = z.object({
        name: z.string()
              .trim()
              .min(3, "Name must be greater than 2 characters.")
              .max(49, "Name must be less than 50 characters."),
        year: z.coerce.number()
              .min(1992, "Year must be after 1991.")
              .max(new Date().getFullYear() + 1, "Year must not be more than a year in the future."),
        event: z.string()
              .trim()
              .min(1, "An event must be selected."),
        backendError: z.any()
    })

    const form = useForm<z.infer<typeof newEventSchema>>({
        resolver: zodResolver(newEventSchema),
        defaultValues: {
            name: "",
            year: new Date().getFullYear(),
            event: ""
        }
    });

    async function action(formData: FormData) {
        const isValid = await form.trigger()

        if (!isValid) return;

        console.log(formData);
    }

    return (
          <>
              <div className={"flex justify-between mt-14"}>
                  <h1>Events</h1>
                  <Dialog>
                      <DialogTrigger asChild><Button>New Event</Button></DialogTrigger>
                      <DialogContent>
                          <DialogHeader>New Event</DialogHeader>
                          <DialogDescription>
                              Creates a new event to pre-scout for.
                          </DialogDescription>
                          <Form {...form}>
                              <form action={action} className={"mt-2"} autoComplete={"off"}>
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
                                      <FormField
                                            control={form.control}
                                            name="year"
                                            render={({field}) => (
                                                  <FormItem className={"formItem"}>
                                                      <FormLabel>Year</FormLabel>
                                                      <FormControl>
                                                          <Input type={"number"} {...field} />
                                                      </FormControl>
                                                      <FormMessage/>
                                                  </FormItem>
                                            )}
                                      />
                                      <FormField
                                            control={form.control}
                                            name="year"
                                            render={({field}) => (
                                                  <FormItem className={"formItem"}>
                                                      <FormLabel>Year</FormLabel>
                                                      <FormControl>
                                                          <Input type={"number"} {...field} />
                                                      </FormControl>
                                                      <FormMessage/>
                                                  </FormItem>
                                            )}
                                      />
                                      <FormField
                                            control={form.control}
                                            name="backendError"
                                            render={() => (
                                                  <FormItem className={"formItem"}>
                                                      <FormMessage/>
                                                  </FormItem>
                                            )}
                                      />
                                  </CardContent>
                                  <CardFooter className={"flex justify-end"}>
                                      <Button type={"submit"}>Start Pre-scouting</Button>
                                  </CardFooter>
                              </form>
                          </Form>
                      </DialogContent>
                  </Dialog>
              </div>
              <Separator />
              <p className={"text-center muted mt-8"}>No events have been pre-scouted for, yet.</p>
          </>
    );
}
