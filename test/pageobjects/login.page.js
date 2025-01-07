const { driver } = require('@wdio/globals');
const { assert } = require('chai');

// Global login function
const globalLogin = async (email, otp) => {
    try {
        // Wait for the group view to be displayed
        await driver.$('com.hor crux.svg.GroupView').isDisplayed();

        // Input email and click Continue
        const emailInput = await driver.$('android.widget.EditText');
        const continueBtn = await driver.$('~Continue');
        await emailInput.setValue(email);
        await continueBtn.click();

        // OTP Verification
        if (await driver.$('//android.widget.ScrollView/android.view.ViewGroup').isDisplayed()) 
        {
            console.log("OTP for login", otp);
            // Enter OTP
            for (let i = 0; i < otp.length; i++) {
                const otpInput = await driver.$(`//android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[${i + 1}]`);
                await otpInput.setValue(otp[i]);
            }

            // Check if logged in and on the sign-up process screen
            if (await driver.$('id=fab-container').isDisplayed() || await driver.$('~//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]').isDisplayed()) 
              {
                // Sign-up process
                if (await driver.$('~//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]').isDisplayed()) 
                 {
                    
                    assert('Welcome to sign-up process');
                    
                    // Select language
                    if (await driver.$('~//android.widget.RadioButton[@content-desc="English"]/android.view.ViewGroup').isDisplayed()) 
                    {
                        const languageRadioButton = await driver.$('~//android.widget.RadioButton[@content-desc="English"]/android.view.ViewGroup');
                        await languageRadioButton.click();
                        const continueLanguageBtn = await driver.$('id=Continue');
                        await continueLanguageBtn.click();
                    }

                    // Onboarding screen
                    if (await driver.$('android.widget.ImageView').isDisplayed()) {
                        const skipOnboardingBtn = await driver.$('~//android.widget.TextView[@text="Skip"]');
                        await skipOnboardingBtn.click();
                    }

                    // Profile screen
                    if (await driver.$('~//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.ImageView').isDisplayed()) {
                        await fillOutProfile();
                    } else {
                        console.error('Profile screen is not displayed');
                    }
                }
                else
                {
                    if (await driver.$('id=fab-container').isDisplayed())
                     {
                        assert('Logged in successfully');
                     }
                    
                }
              } 
            else 
              {
                console.warn('The OTP entered is invalid/incorrect. Please try again');
              }
        } 
        else 
        {
            console.error('OTP screen is not displayed');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};

// Function to fill out the profile
const fillOutProfile = async () => {
    const firstNameField = await driver.$('~(//android.widget.EditText[@text="Enter Name"])[1]');
    await firstNameField.setValue('Sachin');
    const lastNameField = await driver.$('~(//android.widget.EditText[@text="Enter Name"])[2]');
    await lastNameField.setValue('Kumar');
    const phoneNumberField = await driver.$('~//android.widget.EditText[@text="Phone Number"]');
    await phoneNumberField.setValue('9876543210');

    // Select Date of Birth
    const calendarButton = await driver.$('~//android.view.ViewGroup[@content-desc="Enter Date of birth, 0, "]/android.view.ViewGroup');
    await calendarButton.click();
    const DOB = await driver.$('~//android.view.View[@content-desc="10 December 2024"]');
    await DOB.click();

    // Select Gender
    const genderButton = await driver.$('~//android.view.ViewGroup[@content-desc="Choose Gender"]/android.widget.ImageView');
    await genderButton.click();
    const genderType = await driver.$('~//android.widget.TextView[@text="Male"]');
    await genderType.click();

    // Continue with profile
    const continueBtn = await driver.$('id=Continue');
    await continueBtn.click();
};

module.exports = { globalLogin };



