# plotly-challenge
* November 5, 2019
* [Link to final deployed Heroku app](https://jlcatx512-plotly-challenge.herokuapp.com)

## IMPORTANT TIPS ##
* Stuff I wish I remembered before doing the assignment.
* Don't forget to cast data as numbers!
    * e.g. `sampleData.samples_values = sampleData.sample_values.map(d => +d);`
* Always remember to push local changes to your repo BEFORE doing merging pull requests on the GitHub repo.

## LINKS ##
* [Instructions](https://github.com/the-Coding-Boot-Camp-at-UT/UT-MCB-DATA-PT-07-2019-U-C/tree/master/homework-instructions/15-Interactive-Visualizations-and-Dashboards/Instructions)
* [Heroku dashboard](https://dashboard.heroku.com/apps/jlcatx512-plotly-challenge/deploy/github)
* [How to upload/download to Heroku](https://bootcampspot.com/sessions/591054/videos/62383)
  * UTAUS201901DATA3 Sat, Nov 2 2019 at 10:00 AM
  * GitHub security alerts.
* https://www.w3schools.com/tags/tag_strong.asp

## How to loop through `Object.entries` ##
* [MDN on Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
* [Looping through objects in JavaScript](https://zellwk.com/blog/looping-through-js-objects/)

## VS Code Integrated Terminal ##
* Control + Shift + C
* Tip: right click on the file you're interested in opening in the terminal, select openin terminal. Will save steps to navigate to the file.
* https://code.visualstudio.com/docs/editor/integrated-terminal
* open multiple terminals to multiple locations.
* Control Shift 5 to split.
* Useful for adding, committing and pushing code directly to GitHub repo.

## `async await` ##
* You need an async await when calling in data from another source vs. defining it in the function.

## Pie Charts in Plotly ##
* [Pie Charts in JavaScript](https://plot.ly/javascript/pie-charts/)
* [hovertext for pie charts Plotly](https://plot.ly/javascript/reference/#pie-hovertext)

## Scatter Charts in Plotly ##
* [](https://plot.ly/javascript/line-and-scatter/)
* [Scatter Plot with a Color Dimension](https://plot.ly/javascript/line-and-scatter/#scatter-plot-with-a-color-dimension)

## Inspect DB with DB Browser for SQLlite ##
* Open another instance to view two DB's at the same time.

## How to deploy app to Heroku ##
* [UTAUS201901DATA3 Sat, Nov 2 2019 at 10:00 AM](https://bootcampspot.com/sessions/591054/videos/62383)
* Pet Pals assignment
* security issues. GitHub
    * offers a pull request for you to update requirements.txt.
* Don't forget shell configuration script files.
    * 1. `run.sh` --> `FLASK_APP=Belly_Button_Diversity/app.py flask run`
    * 2. `Procfile` --> `web: gunicorn Belly_Button_Diversity.app:app`
    * 3. `requirements.txt` --> NB gunicorn
    * 4. `runtime.txt` python version. 3.6.2?  
* [Heroku apps](https://dashboard.heroku.com/apps)
* Basic steps -->
    * create app on Heroku.
    * https://dashboard.heroku.com/new-app
    * connect the app through the Heroku dashboard to GitHub repo.
        * Click on the deploy tab. Under Deployment Method, click on connect to GitHub.
        * You will get a search input window to search for your repo.
    
## How to do it from scratch ##
* Two approaches.
* See class video for most streamlined.
* create repo.
* `rm -rf .git` --> deletes git files to delete repo.
* `git add .`
    * add repo locally. Then create GH repo to link to.
    * No readme.
* `git remote add origin [GitHub URL]`
    * origin aliases to github repo.
* `git push -u origin master`

## How to fix security alerts ##
* Click on pull requests
    * https://github.com/jlcatx512/plotly-challenge/pulls
* Click on each request.
* automated pull requests
* Confirm merge
* delete the branch
* `SQLAlchemy==SQLAlchemy>=1.3.0 # 1.2.10`
* `Jinja2==2.10.1 # 2.10`