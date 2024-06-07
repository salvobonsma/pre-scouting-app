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
import {useEffect, useState} from "react";
import NewEvent from "@/lib/generate/new-event";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import GetEventsByYear, {ClientEventSelector} from "@/lib/generate/get-events-by-year";

export default function Home() {
    const [loadingNewEvent, setLoadingNewEvent] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [eventList, setEventList] = useState<Array<ClientEventSelector>>([]);

    useEffect(() => {
        const fetchEventList = async () => {
            const response = await GetEventsByYear(selectedYear);

            setEventList(response);
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchEventList();
    }, [selectedYear]);

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

    form.watch((data, {name, type}) => {
        if (!data.year) return;
        if (name == "year" && type == "change") setSelectedYear(data.year);
    });

    async function action(formData: FormData) {
        const isValid = await form.trigger()
        if (!isValid) return;

        setLoadingNewEvent(true);
        console.log(formData)
        const response = await NewEvent(
              // @ts-ignore
              formData.get("event"),
              // @ts-ignore
              +formData.get("year"),
              // @ts-ignore
              formData.get("name").toString()
        );

        form.setError("backendError", {message: response.message});

        setLoadingNewEvent(false);
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
                                            name="event"
                                            render={({field}) => (
                                                  <FormItem className={"formItem"}>
                                                      <FormLabel>Event</FormLabel>
                                                      <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            disabled={eventList.length <= 0}
                                                      >
                                                          <FormControl>
                                                              <SelectTrigger>
                                                                  <SelectValue placeholder="Select an event"/>
                                                              </SelectTrigger>
                                                          </FormControl>
                                                          <SelectContent>
                                                              {eventList.map((value) => {
                                                                  return (
                                                                        <SelectItem key={value.value}
                                                                                    value={value.value}>
                                                                            {value.display}
                                                                        </SelectItem>
                                                                  )
                                                              })}
                                                          </SelectContent>
                                                      </Select>
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
                                  <CardFooter className={"flex-col"}>
                                      <Button type={"submit"} disabled={loadingNewEvent}>
                                          {loadingNewEvent ? "Loading..." : "Start Pre-scouting"}
                                      </Button>
                                      <p className={"mt muted"}>May take a while to generate, allow up to a minute.</p>
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
