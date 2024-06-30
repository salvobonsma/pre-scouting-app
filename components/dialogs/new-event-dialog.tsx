'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CardContent, CardFooter} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import GetEventsByYear, {ClientEventSelector} from "@/lib/database/get-events-by-year";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import NewEvent from "@/lib/database/new-event";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {useEffect, useState} from "react";

export default function NewEventDialog() {
    const [loadingNewEvent, setLoadingNewEvent] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [eventList, setEventList] = useState<Array<ClientEventSelector>>([]);
    const [selectEventOpen, setSelectEventOpen] = useState(false);

    useEffect(() => {
        const fetchEventList = async () => {
            const response = await GetEventsByYear(selectedYear);

            setEventList(response);
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchEventList();
    }, [selectedYear]);

    useEffect(() => {
        console.log(selectEventOpen)
    }, [selectEventOpen]);

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

    async function onSubmit(data: z.infer<typeof newEventSchema>) {
        setLoadingNewEvent(true);
        const response = await NewEvent(
              data.event,
              data.year,
              data.name
        );
        if (!response) return;

        form.setError("backendError", {message: response.message});

        setLoadingNewEvent(false);
    }

    return (
          <Dialog>
              <DialogTrigger asChild><Button className={"m-1.5"}>New Event</Button></DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>New Event</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                      Creates a new event to pre-scout for.
                  </DialogDescription>
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
                                          <FormItem className="flex flex-col max-w-[26em]">
                                              <FormLabel>Event</FormLabel>
                                              <Popover open={selectEventOpen} onOpenChange={setSelectEventOpen} modal>
                                                  <PopoverTrigger asChild>
                                                      <FormControl className={"flex justify-between"}>
                                                          <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className="overflow-clip"
                                                          >
                                                              {field.value
                                                                    ? eventList.find(
                                                                          (event) => event.value === field.value
                                                                    )?.display
                                                                    : "Select event"}
                                                              <ChevronsUpDown
                                                                    className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                          </Button>
                                                      </FormControl>
                                                  </PopoverTrigger>
                                                  <PopoverContent className="p-0"
                                                                  side={"bottom"}
                                                                  align={"center"}
                                                  >
                                                      <Command>
                                                          <CommandInput placeholder="Search event..."/>
                                                          <CommandEmpty>No events found.</CommandEmpty>
                                                          <CommandGroup className={"max-h-80"}>
                                                              <CommandList>
                                                                  {eventList.map((event, index) => {
                                                                      return (
                                                                            <CommandItem
                                                                                  value={event.display}
                                                                                  key={event.value}
                                                                                  onSelect={() => {
                                                                                      form.setValue("event", event.value)
                                                                                      setSelectEventOpen(false);
                                                                                  }}
                                                                            >{event.display}</CommandItem>
                                                                      )
                                                                  })}
                                                              </CommandList>
                                                          </CommandGroup>
                                                      </Command>
                                                  </PopoverContent>
                                              </Popover>
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
    )
}