# NargaFinder
Literally the most goofy ah thing I've ever made.
The code will most likely break in some amount of time.

## How it works

### HTTP requests
I looked the HTTP requests made by [the official SUN venue timetable](https://web-apps.sun.ac.za/SyllabusPlusTimetables/DisplayVenueTimetableEng.jsp) and copied it.
Then I realized that it won't work becuz CORS!!!! yay

### I made a cors proxy lol
Thanks, [cors-anywhere](https://github.com/Rob--W/cors-anywhere/tree/master)!

### I scrape the html returned by the request
BRO the way html tables work is INSANE

### I display it on the screen
Quite trivial

## Why
Because i think it is way to much effort currently to find out which nargas are open and when they'll be open.
