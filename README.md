## Moodle Cleaner

This project aims to resolve currently terrible UX of HKU Moodle page. Currently there is no method for user to adjust the contents of the page without resorting to JavaScript plug-in.

Some examples include:

1. Cannot hide courses of the past semesters.
2. Cannot change the order of the courses or how they are rendered.
3. The links are not sorted according to the course code, which should be very easy function to add from Moodle developer.

Moodle changes their UI in July 2024, but they don't know where the problem is.

## Updates

_Aug. 18_

HKU ITS removes the side bar navigaiton hyperlinks to other course pages in all `moodle.hku.hk/*` pages. Originally the side bar is used to fetch wanted data, including course name and links to individual pages. The major features of this extension all rely on this. This also kills another extension called [HKU Moodle Helper](https://chromewebstore.google.com/detail/hku-moodle-helper/einenigpmpgopefpkfbmnlcjmoamijap).

The new implementation will revert this sidebar feature by building a simple navigation bar container with selected courses. Users are required to allow extension to fetch relevant course data, the fetched data will be stored and used to construct new HTML elements.

## Functions

The extension allows user to sort the side navigation bar according to keys such as course codes, academic year/semester, or self-defined significance.

User can also filter the courses they want to see, they can provide which year and which semester of courses to render. They can also provide course code prefixes such as `COMP`.

They can also tidy up majority of contents in the main body part, and render some buttons to help them navigate to course page without looking for the hyperlink. In the first version of extension, these buttons will be the same with the ones on the side bar.

### Progress

The first production is due by the end of September to deal with a sudden change in UI layout in mid August.

### PR

Of course welcome.
