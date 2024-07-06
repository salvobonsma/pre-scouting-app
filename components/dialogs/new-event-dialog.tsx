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
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {useEffect, useState} from "react";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {ChevronsUpDown, Loader2} from "lucide-react";

export default function NewEventDialog() {
    const [loadingNewEvent, setLoadingNewEvent] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [eventList, setEventList] = useState<Array<ClientEventSelector>>([]);
    const [selectEventOpen, setSelectEventOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ClientEventSelector>({
        value: "",
        display: "Select Event"
    });

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

    useEffect(() => {
        form.setValue("event", selectedEvent.value)
    }, [form, selectedEvent]);

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
                      <DialogDescription>
                          Creates a new event to pre-scout for.
                      </DialogDescription>
                  </DialogHeader>
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
                                    render={() => (
                                          <FormItem className={"formItem"}>
                                              <FormLabel>Event</FormLabel>
                                              <ComboBoxResponsive
                                                    open={selectEventOpen}
                                                    setOpen={setSelectEventOpen}
                                                    selected={selectedEvent}
                                                    setSelected={setSelectedEvent}
                                                    eventList={eventList}
                                              />
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
                                  {loadingNewEvent && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                                  {loadingNewEvent ? "Please Wait" : "Start Pre-scouting"}
                              </Button>
                              <p className={"mt muted"}>May take a while to generate, allow up to a minute.</p>
                          </CardFooter>
                      </form>
                  </Form>
              </DialogContent>
          </Dialog>
    )
}

function ComboBoxResponsive({
                                open,
                                setOpen,
                                selected,
                                setSelected,
                                eventList
                            }: {
    open: boolean,
    setOpen: (open: boolean) => void,
    selected: ClientEventSelector,
    setSelected: (status: ClientEventSelector) => void,
    eventList: Array<ClientEventSelector>
}) {
    if (window.innerWidth > 768) {
        return (
              <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                      <FormControl className={"flex justify-between"}>
                          <Button
                                variant="outline"
                                role="combobox"
                          >
                              {selected.display}
                              <ChevronsUpDown
                                    className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                          </Button>
                      </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-screen sm:w-[40em] p-0">
                      <EventList open={open} setOpen={setOpen} setSelected={setSelected} eventList={eventList}/>
                  </PopoverContent>
              </Popover>
        )
    }

    return (
          <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                  <FormControl className={"flex justify-between"}>
                      <Button
                            variant="outline"
                            role="combobox"
                      >
                          {selected.display}
                          <ChevronsUpDown
                                className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                      </Button>
                  </FormControl>
              </DrawerTrigger>
              <DrawerContent>
                  <div className="mt-4 border-t">
                      <EventList open={open} setOpen={setOpen} setSelected={setSelected} eventList={eventList}/>
                  </div>
              </DrawerContent>
          </Drawer>
    );
}

function EventList({
                        setOpen,
                        setSelected,
                        eventList
                    }: {
    open: boolean,
    setOpen: (open: boolean) => void,
    setSelected: (status: ClientEventSelector) => void,
    eventList: Array<ClientEventSelector>
}) {
    return (
          <Command>
              <CommandInput placeholder="Search events..."/>
              <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                      {eventList.map((event) => (
                            <CommandItem
                                  key={event.value}
                                  value={event.display}
                                  onSelect={() => {
                                      setSelected(event)
                                      setOpen(false)
                                  }}
                            >
                                {event.display}
                            </CommandItem>
                      ))}
                  </CommandGroup>
              </CommandList>
          </Command>
    )
}