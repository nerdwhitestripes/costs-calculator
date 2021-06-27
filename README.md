# **UK Personal Injury Costs Calculator**
#### Video Demo:  <URL HERE>
#### Description:
My Name is Kam Cheng and I live in Manchester, England. I work in the field of insurance and specifically on personal injury claims made against businesses and individuals in the UK. 

Part of my role includes calculating the legal fees being claimed by third party solicitors, and there are differing costs calculations depending on numerous factors, including the jurisdiction, type of claim being made, date of claim, and stage at which the claim was settled. Given the numerous rules in place, this can make it time-consuming, and even confusing for us to ensure that the correct value is being reached. 

I have therefore created a website containing a calculator which makes it easier for us to quickly and easily obtain the correct costs, based on the factors selected. Whilst there are other costs-calculators available on the internet, I believe that mine is unique in that in also factors in jurisdiction, including calculations for England & Wales, Scotland, and Northern Ireland. 

## **Explanation for files included:** 

### **index.html**
This contains the only webpage, which houses the costs calculator. Given that the page serves one function, I decided to make it as simple as possible. As such, you will note there is no nav bar, or any other clutter. 

I decided to include bootstrap onto the webpage, and used their classes for the input,select and button functions as I find them easy to modify, and visually appealing. 

In order to keep everything tidy, I decided to separate the CSS and JS codes into other files. 

You will note that index.html contain a lot of different option boxes, but that many of these are hidden when initially loaded up. This is because some options are only applicable depending on the jurisidiction selected. As such, I decided it would be more dynamic and visually appealing if these were kept hidden until required, to reduce the clutter on the website, and avoid the risk of incorrect options being selected. 


### **styles.css**
This contains the css style codes of the file. 

Whilst there are not many different style attributes due to the simplicity of the website, you will note that I have used CCS to change the display of three certain classes to "none". These classes will only change to "block" when certain other options are selected. 

They styles I have changed on here mainly focus on aligning the boxes to be horizonally centered

### **scripts.js**
During my cs50 course I had programmed websites using both javascript and python. For my website I decided that javascript would be more appropriate, as my costs-calculator did not require any data to be sent back to the server for recording, nor would there be any access to any databases. By using javascript the calculator could be run on the user's own system, making the website more efficient. 

You will note that the file contains the bulk of my work, and took the most of my time to code. The focus here is to run the calculations and to make the website more dynamic through use of manipulation of html and css styles. 

**Calculator** 
  
After taking the values provided by the user, the website will run the values through the numerous functions available, returning the results on the same page. 

You will note that there is a great number of functions (especially for the E&W jursidiction), due to the different calculations required depending on which options had been selected. In order to pass the user values through these functions as efficiently as possible, I input the names of many these functions to be the same as the html.value. This way I could pass those values through to the relevant function, by manipulating the html.value (which was a string) and passing it through the ```window[html.value]();```. 

I also carried our some error checking, to ensure that the initial damages value was limited to 2 decimal places (as it was monetary). Also, if certain options had been left unselected, an 'alert' message would show up. 

**Dynamic html/ccs**
  
As I wanted to focus all my javascript code in this file rather than having it on html, I relied on event listeners to run my code. 

This also helped me to make a more dynamic website, as I was able to modify the html/css elements depending on the actions of the user. 

Much of the modifications comes from showing and hiding option selectors based on the selections made by the user. In particular, depending on which jurisidiction the user selected, the relevant options would the reveal themselves. This ensures that the website is as simple, slick, and decluttered as possible, and it also prevents users from selecting options which are irrelevant, for the purposes of calulcating that specific cost. 

I also designed my code so that the result that is returned is converted into a currency format, rounding the value up to 2 decimal places. These results are then displayed in a (previously hidden) box at the bottom. 
