import {ThemeToggle} from "@/components/theme/theme-toggle";

export default function Header() {
    return (
          <header
                className={"w-full h-14 supports-backdrop-blur:bg-background/60 sticky top-0 z-50 border-b bg-background/95 backdrop-blur"}>
              <nav className={'container flex h-14 items-center'}>
                  <a href={"/"}><p className={"font-bold cursor-pointer"}>Pre-Scouting App</p></a>
                  <div className={"flex justify-end flex-1"}>
                      <ThemeToggle/>
                  </div>
              </nav>
          </header>
    )
}