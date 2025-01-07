const { globalLogin } = require('../pageobjects/login.page.js');

describe('Launch App Test', () => {
    // Before hook to perform login
    before(async () => {
        try {
            await globalLogin('ksachin3025@gmail.com', [2, 0, 1, 6]); // Ensure OTP is passed correctly
        } catch (error) {
            console.log('Error during login:', error);
        }
    });

    // The main test to verify login and app functionality
    it('should open the app and verify its title', async () => {
        console.log('Performing test actions...');
        // You can add additional assertions or checks here to verify if the app's title or home screen is correctly displayed
    });
});
