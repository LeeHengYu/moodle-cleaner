## Moodle Cleaner

This project aims to resolve currently terrible UX of HKU Moodle page. Currently there is no method for user to adjust the contents of the page without resorting to JavaScript plug-in.

Some examples include:

1. Cannot hide courses of the past semesters.
2. Cannot change the order of the courses or how they are rendered.
3. The links are not sorted according to the course code, which should be very easy function to add by HKU ITS.
4. No sidebar or hyperlinks to other courses if not in the home page.

## Updates

_Sep. 1_

[HKU Moodle Helper](https://chromewebstore.google.com/detail/hku-moodle-helper/einenigpmpgopefpkfbmnlcjmoamijap) deployed a newer version recently, which allowed users to pin the courses in the home page to the top for quicker search.

_Aug. 18_

HKU ITS removes the side bar navigaiton hyperlinks to other course pages in all `moodle.hku.hk/*` pages. Originally the side bar is used to fetch wanted data, including course name and links to individual pages. The major features of this extension all rely on this. This also kills another extension called [HKU Moodle Helper](https://chromewebstore.google.com/detail/hku-moodle-helper/einenigpmpgopefpkfbmnlcjmoamijap).

## Functionalities

In v1.0.0, I try to provide basic custom filter configurations that work for most of the use cases.

User can also filter the courses they want to see, they can provide which year and which semester of courses to render. They can also provide course code prefixes such as `COMP` or `FINA`. If this is not provided, by default we don't filter based on any prefixes.

After filtering, if the user provides both year and sem params, corresponding hyperlinks will be rendered on the top nav bar. Whenever users stay on `moodle.hku.hk` webpages, these will be shown.

![Sample image](./sample.png)

The user configuration will be saved to cloud linked to the Google account, and will be synced across devices logged in with the same account. Therefore even when the user is not logged in with their Moodle account, they can still click on the button => redicrect to authenticate => land on the course page they want.

### Progress

The first production is due by the mid-September to deal with a sudden change in UI layout in mid August.

### PR

Welcome
