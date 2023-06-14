# Learning Journal
I started this weekly journal to reflect on my learning progress when developing this menu app, in the hope to improve my existing and future works.

This journal considers:
- specific issues and my way of solving them
- analytical comments on my approach
- my anticipation for next week

## Week 1
Date: Jun 7 2023, Wed

Issue: debugging Passportjs authentication
- `Passport.js` official documentation lacks specificity, making it difficult to apply and debug
- this app has two origins. `deserializeUser()` cannot run, no bug is printed, and I cannot set cookies on browser

I chose to use Passport.js to authenticate users as it is widely used, and provides social media strategies for authentication. The documentation explains basic concepts well but lacks thorough details of the parameters of each function, which confused me when I tried to apply personalized functionalities. I quickly went through youtube tutorials, which I did not find useful to solve my actual issue, but they are very helpful for me to get familiar with how actual applications work. Online forums such as freeCodecamp, Stack Overflow, and personal blogs provide various approaches to the issue, and I read most of the posts to figure out a way that resolves my issue. When I finished this implementation, however, I found a unofficial [manual](https://github.com/jwalton/passport-api-docs#intro) that lists all the function details that I wanted to know. It would be so helpful if I found that out earlier. For the next time, I would target such a detailed doc first when learning a new library.

I had a hard time debugging when the client side reported a `401 Unauthorized` error, which is probably caused by the AJAX polling across the origin. After a fruitless search on the net, I explained the logic of this app to my learning partner. Clarifying and expressing the logic helped me with understanding the library, but not with this specific error. My partner then suggested to find the specific line of code that went wrong by printing when every function was executed. Although he did not work with this library before, this advice was very helpful and effective, as I soon found out the issue.

Another issue with `Passport.js` is that, when my project runs, `deserializeUser()` never runs (tested by `console.log`), but no error is printed out. When I checked online for similar issues, the solution is to set cors headers, so that they allow cross-origin cookie settings. I quickly applied the suggested headers, but the problem is not solved. I spent the next several hours rereading the issue to make sure that I did not miss anything, but there is nothing I missed about the cookies. At some point, I checked my other session headers and realized that I set `{secure: true}`, which is supposed to work only with SSL, while my project is on HTTP. I solved the issue that troubled me for days, just for my negligence, for practicing some daily habits without careful consideration. I also feel the need to learn all express-session headers. Next time when debugging, I should check all possible sections of code that might produce errors. And I should also read through a concept well, not just the more practical part of it.

Then I realized, that via the default `{HttpOnly: true}` cookies, React js cannot read its contents. I only worked with authentication on single origin app before, I did not realize it until it happened to me. I might need to change my way for user sessions, and this will be my task for next week.

## Week 2
Date:
Issue: learn JWT
