# Moodle Cleaner

This project aims to resolve currently terrible UX of HKU Moodle page. Currently there is no method for user to adjust the contents of the page without resorting to JavaScript plug-in.

# Features

On v1.1.0, Cleaner provides sorting, filtering, course-specific notes and custom links embedding.

## Sorting

The course list is now sorted in lexicographic order under all cases.

## Filtering

User can filter the courses they want to see by providing which (academic) year and which semester of courses to keep. They can also provide course code prefixes such as `COMP` or `FINA` to filter further. To filter, the user must provide `year`.

If user only provides `year`, the Cleaner looks for the course text that has `year` inside. For example, if user enters 2024, "COMP3297 Software engineering [Section 1A, 2024]" will be selected.

If user provides both `year` and `sem`, the Cleaner looks for the pattern "Section \<sem\>X" or "Section FA" to match. Only semester 1 and 2 are now supported.

User can enter the course code prefixes to keep delimited by semi-colons (;). For example, if the user only wants to see ECON and FINA level 3 courses, they should type in `ECON; FINA3`. This field is optional.

## Some courses not being picked up or want to include some other utility moodle page?

User can provide texts (substrings) that exist in the course title. Cleaner looks for these strings and keep them on the page. Users need to provide a (ideally short) title to as the identifier of the course, which will be used as the text of the navigation button on the nav bar.

For example, if the user typed in "CUND9003/Canton", the Cleaner will pick up any course that has CUND9003 in the course title, and the button on top will display "Canton" instead of the course code. You can provide more than one condition, delimited by semi-colons (;). This can override the filtering results.

## Hyperlinks on the nav bar

If the user provides both `year` and `sem` for filtering, corresponding hyperlinks to the filtered courses will be rendered on the top nav bar. Whenever users stay on `moodle.hku.hk` webpages, users can directly navigate to other pages through them.

# Cloud Sync

We store the user information in 2 different cloud storage spaces. Users do not need to reconfigure their Cleaner when switching the device.

1. Chrome sync storage: this is connected to the signed-in Google account of the chrome browser. In this storage, we stored filter parameters, course notes, userId for Firestore database querying.
2. Firestore is storing course-specific links for all the users.

# Privacy Policy

The project is open-source so the reviewers or anyone one can see the implementation.

### What type of data we collected?

The only data that is being used is the course list when the user stays on the Moodle home page, and the data will be handled by converting necessary information to json format to be saved. The course data, along with the parameters typed in the popup, will be saved to the cloud storage to create HTML elements, and will only be saved locally or synced with your Google account.

### Data Sharing & Transfer & Security

Moodle Cleaner does not use user data nor share it to the third parties for unrelated purposes. In fact, there is no method for the developer to fetch the user data.

### Contact Information

If you have any questions, concerns, or feedback regarding the privacy policy or Moodle Cleaner, please contact via [hengyuli901229@gmail.com](mailto:hengyuli901229@gmail.com) or leave your comment on chrome web store or github issue. Your advice is what makes this extension better.

# Updates

_Sep. 1_

[HKU Moodle Helper](https://chromewebstore.google.com/detail/hku-moodle-helper/einenigpmpgopefpkfbmnlcjmoamijap) deployed a newer version recently, which allowed users to pin the courses in the home page to the top for quicker search. However, this extension is not compatible with Moodle Cleaner.

_Aug. 18_

HKU ITS removes the side bar navigation hyperlinks to other course pages in all `moodle.hku.hk/*` pages. Originally, the sidebar was used to fetch desired data, including course names and links to individual pages. The major features of this extension all rely on these. This also kills another extension called [HKU Moodle Helper](https://chromewebstore.google.com/detail/hku-moodle-helper/einenigpmpgopefpkfbmnlcjmoamijap).

## Progress

v1.1.0 introduces multiple new features and serves as the demo version for capstone project.

## Pull Requests

Welcome

## Your Support

You can choose to make a small donation via [Buy Me a Coffee](https://buymeacoffee.com/hengyuli90j). Your support can help the developer of this extension closer to more NewJeans & aespa concerts in the future!!!!!!
