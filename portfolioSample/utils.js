// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

// /**
//  * Comprehensive JavaScript Utility Functions
//  * Supports modern JavaScript (ES6+)
//  */

// // Utility Class for advanced operations
// class Utils {
//     /**
//      * Generate a unique identifier
//      * @param {number} [length=10] - Length of the unique ID
//      * @returns {string} Unique identifier
//      */
//     static generateUniqueId(length = 10) {
//         return Math.random().toString(36).substring(2, 2 + length);
//     }

//     /**
//      * Deep clone an object or array
//      * @param {*} obj - Object or array to clone
//      * @returns {*} Deep cloned object
//      */
//     static deepClone(obj) {
//         if (obj === null || typeof obj !== 'object') {
//             return obj;
//         }

//         if (Array.isArray(obj)) {
//             return obj.map(item => this.deepClone(item));
//         }

//         const clonedObj = {};
//         for (const key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 clonedObj[key] = this.deepClone(obj[key]);
//             }
//         }

//         return clonedObj;
//     }

//     /**
//      * Debounce a function
//      * @param {Function} func - Function to debounce
//      * @param {number} [delay=300] - Delay in milliseconds
//      * @returns {Function} Debounced function
//      */
//     static debounce(func, delay = 300) {
//         let timeoutId;
//         return function (...args) {
//             const context = this;
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => func.apply(context, args), delay);
//         };
//     }

//     /**
//      * Throttle a function
//      * @param {Function} func - Function to throttle
//      * @param {number} [limit=300] - Time limit in milliseconds
//      * @returns {Function} Throttled function
//      */
//     static throttle(func, limit = 300) {
//         let inThrottle;
//         return function (...args) {
//             const context = this;
//             if (!inThrottle) {
//                 func.apply(context, args);
//                 inThrottle = true;
//                 setTimeout(() => inThrottle = false, limit);
//             }
//         };
//     }
// }

// // Advanced Validation Utilities
// class Validator {
//     /**
//      * Validate email address
//      * @param {string} email - Email to validate
//      * @returns {boolean} Is email valid
//      */
//     static isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     /**
//      * Validate phone number
//      * @param {string} phone - Phone number to validate
//      * @param {string} [country='US'] - Country code
//      * @returns {boolean} Is phone number valid
//      */
//     static isValidPhone(phone, country = 'US') {
//         const phoneRegexes = {
//             'US': /^\+?1?\s*\(?-*\)?\s*\d{3}\s*-*\s*\d{3}\s*-*\s*\d{4}$/,
//             'UK': /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
//             'IN': /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
//         };

//         const regex = phoneRegexes[country] || phoneRegexes['US'];
//         return regex.test(phone);
//     }

//     /**
//      * Validate password strength
//      * @param {string} password - Password to validate
//      * @param {Object} [options] - Validation options
//      * @returns {boolean} Is password strong
//      */
//     static isStrongPassword(password, options = {}) {
//         const {
//             minLength = 8,
//             requireUppercase = true,
//             requireLowercase = true,
//             requireNumbers = true,
//             requireSpecialChars = true
//         } = options;

//         const lengthValid = password.length >= minLength;
//         const uppercaseValid = !requireUppercase || /[A-Z]/.test(password);
//         const lowercaseValid = !requireLowercase || /[a-z]/.test(password);
//         const numberValid = !requireNumbers || /\d/.test(password);
//         const specialCharValid = !requireSpecialChars || /[!@#$%^&*(),.?":{}|<>]/.test(password);

//         return lengthValid && 
//                uppercaseValid && 
//                lowercaseValid && 
//                numberValid && 
//                specialCharValid;
//     }
// }

// // Storage Management Utilities
// class StorageManager {
//     /**
//      * Set item in local storage with optional expiration
//      * @param {string} key - Storage key
//      * @param {*} value - Value to store
//      * @param {number} [expiryInMinutes] - Expiration time in minutes
//      */
//     static setItem(key, value, expiryInMinutes = null) {
//         const item = {
//             value: value,
//             expiry: expiryInMinutes 
//                 ? new Date(Date.now() + expiryInMinutes * 60 * 1000) 
//                 : null
//         };
//         localStorage.setItem(key, JSON.stringify(item));
//     }

//     /**
//      * Get item from local storage
//      * @param {string} key - Storage key
//      * @returns {*|null} Stored value or null
//      */
//     static getItem(key) {
//         const itemStr = localStorage.getItem(key);
//         if (!itemStr) return null;

//         const item = JSON.parse(itemStr);
        
//         if (item.expiry && new Date(item.expiry) < new Date()) {
//             localStorage.removeItem(key);
//             return null;
//         }

//         return item.value;
//     }
// }

// // Network and API Utilities
// class NetworkUtils {
//     /**
//      * Fetch with timeout and error handling
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [timeout=10000] - Timeout in milliseconds
//      * @returns {Promise} Fetch promise
//      */
//     static async fetchWithTimeout(url, options = {}, timeout = 10000) {
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);

//         try {
//             const response = await fetch(url, {
//                 ...options,
//                 signal: controller.signal
//             });

//             clearTimeout(id);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             clearTimeout(id);
//             throw error;
//         }
//     }

//     /**
//      * Retry a fetch request
//      * @param {string} url - URL to fetch
//      * @param {Object} [options={}] - Fetch options
//      * @param {number} [retries=3] - Number of retries
//      * @param {number} [backoff=300] - Backoff between retries
//      * @returns {Promise} Fetch promise
//      */
//     static async retryFetch(
//         url, 
//         options = {}, 
//         retries = 3, 
//         backoff = 300
//     ) {
//         try {
//             return await this.fetchWithTimeout(url, options);
//         } catch (err) {
//             if (retries === 0) throw err;
            
//             await new Promise(resolve => setTimeout(resolve, backoff));
//             return this.retryFetch(
//                 url, 
//                 options, 
//                 retries - 1, 
//                 backoff * 2
//             );
//         }
//     }
// }

// // Date and Time Utilities
// class DateUtils {
//     /**
//      * Format date to relative time
//      * @param {Date|string} date - Date to format
//      * @returns {string} Relative time string
//      */
//     static formatRelativeTime(date) {
//         const now = new Date();
//         const dateObj = new Date(date);
//         const diff = (now - dateObj) / 1000;

//         const units = [
//             { max: 60, divisor: 1, name: 'second' },
//             { max: 3600, divisor: 60, name: 'minute' },
//             { max: 86400, divisor: 3600, name: 'hour' },
//             { max: 604800, divisor: 86400, name: 'day' },
//             { max: 2592000, divisor: 604800, name: 'week' },
//             { max: 31536000, divisor: 2592000, name: 'month' }
//         ];

//         for (let unit of units) {
//             if (Math.abs(diff) < unit.max) {
//                 const value = Math.floor(Math.abs(diff) / unit.divisor);
//                 return value > 1 
//                     ? `${value} ${unit.name}s ago` 
//                     : `${value} ${unit.name} ago`;
//             }
//         }

//         return `${Math.floor(diff / 31536000)} years ago`;
//     }

//     /**
//      * Generate date range
//      * @param {Date} start - Start date
//      * @param {Date} end - End date
//      * @returns {Date[]} Array of dates
//      */
//     static generateDateRange(start, end) {
//         const dates = [];
//         const currentDate = new Date(start);
        
//         while (currentDate <= end) {
//             dates.push(new Date(currentDate));
//             currentDate.setDate(currentDate.getDate() + 1);
//         }
        
//         return dates;
//     }
// }

// // Function to generate random data
// function generateRandomData(type, options = {}) {
//     switch (type) {
//         case 'name':
//             return `${generateRandomString(5)} ${generateRandomString(7)}`;
//         case 'email':
//             return `${generateRandomString(6)}@${generateRandomString(5)}.com`;
//         case 'phone':
//             return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
//         case 'number':
//             const { min = 0, max = 100 } = options;
//             return Math.floor(Math.random() * (max - min + 1)) + min;
//         default:
//             return null;
//     }
// }

// // Helper function to generate random string
// function generateRandomString(length) {
//     return Math.random().toString(36).substring(2, 2 + length);
// }

// // Advanced Object Manipulation
// function objectDiff(obj1, obj2) {
//     const changes = {};
    
//     for (let key in obj1) {
//         if (obj1[key] !== obj2[key]) {
//             changes[key] = {
//                 oldValue: obj1[key],
//                 newValue: obj2[key]
//             };
//         }
//     }

//     return changes;
// }

// // Functional Programming Helpers
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// // Export utilities
// export {
//     Utils,
//     Validator,
//     StorageManager,
//     NetworkUtils,
//     DateUtils,
//     generateRandomData,
//     objectDiff,
//     pipe,
//     compose
// };

