# CSRF Protection Test

This document explains how to test the effectiveness of CSRF protection in your application using a malicious script.



## Prerequisites

- Node.js and npm (or yarn) should be installed on your system.
- Your application, including the `Draft` page, should be set up and running locally.



## Steps

1. **Start Your Application:**

   Start your Next.js development server that hosts your application.

   npm run dev


2. Access Your Draft Page:
    Open your web browser and navigate to your Draft page. For example, 
    if your application is running at http://localhost:3000, go to http://localhost:3000/draft.

3. Keep Draft Page Open:
    Keep the Draft page open in one browser tab or window. 
    This will be the page where you will submit the form with the valid CSRF token.

4. Open the Malicious Attack Page:
    In a different browser tab or window, open the csrf-attack.html file. 
    This file contains a form that will simulate a malicious CSRF attack.
    open csrf-attack.html

5. Observe the Results:
    On the Draft page, submit the form using valid input. You should see that a draft is successfully created.
    On the csrf-attack.html page, observe the form submission. 
    It will attempt to perform a CSRF attack by submitting a draft with invalid input and without a valid CSRF token. 
    You should see that the server responds with a CSRF token validation error, indicating that the CSRF attack was prevented.

6. Interpretation:
    The successful creation of a draft on the Draft page and the prevention of the CSRF attack on the csrf-attack.html page indicate that your CSRF protection mechanism is working correctly.