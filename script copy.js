const puppeteer = require("puppeteer");

// Manual Settings.
/* 
INSTRUCTIONS
- Enter username and password here manually
- Enter Time of your STARS
Note: We will run 3 instances to increase chances of hitting.
Note: This will only register courses in plan 1.
*/


const myUsername = "ryeow002";
const myPassword = "Ezecom86400";

const STARS_HOURS = 14;
const STARS_MINUTES = 0;
const STAR_SECONDS = 0;

let script = async (STARS_HOURS, STARS_MINUTES, STAR_SECONDS) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Log into STARS
    await page.goto(
      "https://wish.wis.ntu.edu.sg/pls/webexe/ldap_login.login?w_url=https://wish.wis.ntu.edu.sg/pls/webexe/aus_stars_planner.main"
    );

    await page.type("#UID", myUsername);

    const loginClick = await page.$x(
      "/html/body/div[3]/div/div/section[2]/div/div/center[1]/form/table/tbody/tr/td/table/tbody/tr[4]/td[2]/input[1]"
    );
    await loginClick[0].click();
    await page.waitForNavigation();
    await page.type("#PW", myPassword);
    const loginClick2 = await page.$x(
      "/html/body/div[3]/div/div/section[2]/div/div/form/center[1]/table/tbody/tr/td/table/tbody/tr[5]/td[2]/input[1]"
    );
    await loginClick2[0].click();

    // Inside STARS Page Already
    const currentTime = Date.now();
    const targetTime = new Date(); 
    targetTime.setHours(STARS_HOURS);
    targetTime.setMinutes(STARS_MINUTES);
    targetTime.setSeconds(STAR_SECONDS);
    const timeDiff = targetTime - currentTime;

    // Wait for the specified time
    await page.waitForTimeout(timeDiff);

    // const registerCourses = await page.$x('/html/body/form[2]/div/div[3]/div/div/section[2]/div/div/p/table/tbody/tr[1]/td[2]/table/tbody/tr[13]/td/form/input[1]')
    // await registerCourses[0].click();
    await page.click("input[type=submit]");
    // Delay to manually interact with the browser
    await page.waitForNavigation();
    
    await page.click("input[type=submit]")
    await page.waitForNavigation();
    await new Promise((resolve) => setTimeout(resolve, 300000)); // 5 minutes delay

    // Close the browser after the delay
    await browser.close();
  } catch (error) {
    console.log(`Error faced : ${error}`)
  }
};

// test single instance
// script(STARS_HOURS, STARS_MINUTES, STAR_SECONDS);

// Execute

for(let i= 0; i<3; i++){
    script(STARS_HOURS, STARS_MINUTES, STAR_SECONDS+i);
}
