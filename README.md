Read-only query interface for the database produced by MageloScraper2.

This is a re-build of [GrixusVisionFrontend](https://github.com/hikemalliday/GrixusVisionFrontend). The purpose of the rebuild was to:

- Learn `react-query`
- Attempt to build without looking at past projects for reference / copypaste.

I did fairly well on not looking at past projects for the most part (forced me to dive deeper into docs and actually understand what I was doing), but I got stuck on the Axios Interceptors + the resolution of tokens + auth and such, but put in a solid effort before opening up an old project to figure out what I did wrong.

This version is not live, unlike [GrixusVisionFrontend](https://github.com/hikemalliday/GrixusVisionFrontend). 

Now that this repo 'works' locally, Im going to rebuild the backend in Django, to force myself to better understand that tech.

DEV NOTES:

`useItems` is basically just an instance of `useQuery` (wrapper is for using a custom axios instance). But note that the `queryKey` for `useItems.useQuery` is useStates: [itemName, charName, page, pageSize]. This allows us to just set these states and auto-refetch / re-render on the spot.
