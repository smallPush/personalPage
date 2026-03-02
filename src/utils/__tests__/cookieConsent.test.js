import assert from 'node:assert';

// Mock localStorage BEFORE dynamic import
const localStorageMock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        },
        removeItem: function(key) {
            delete store[key];
        }
    };
})();

global.localStorage = localStorageMock;

// Mock gtag
let gtagCalls = [];
global.window = {
    gtag: (...args) => {
        gtagCalls.push(args);
    }
};

const runTests = async () => {
    // Dynamic import to ensure globals are set first
    const {
        getStoredConsent,
        setStoredConsent,
        COOKIE_CONSENT_KEY,
        updateGtagConsent,
        initializeConsent
    } = await import('../cookieConsent.js');

    console.log('Running cookieConsent tests...');

    try {
        // Test 1: getStoredConsent returns null when nothing is stored
        localStorage.clear();
        assert.strictEqual(getStoredConsent(), null, 'Should return null when nothing is stored');
        console.log('✓ Test 1: getStoredConsent returns null when empty');

        // Test 2: setStoredConsent stores the value and updates gtag
        const consent = { analytics: true, ads: false };
        gtagCalls = [];
        setStoredConsent(consent);
        assert.strictEqual(localStorage.getItem(COOKIE_CONSENT_KEY), JSON.stringify(consent), 'Should store serialized consent');
        assert.strictEqual(gtagCalls.length, 1, 'Should call gtag once');
        assert.deepStrictEqual(gtagCalls[0], [
            'consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
            }
        ], 'Should call gtag with correct arguments');
        console.log('✓ Test 2: setStoredConsent stores value and updates gtag');

        // Test 3: getStoredConsent retrieves the stored value
        const retrieved = getStoredConsent();
        assert.deepStrictEqual(retrieved, consent, 'Should retrieve the same consent object');
        console.log('✓ Test 3: getStoredConsent retrieves stored value');

        // Test 4: updateGtagConsent handles granted/denied correctly
        gtagCalls = [];
        updateGtagConsent({ analytics: false, ads: true });
        assert.deepStrictEqual(gtagCalls[0][2], {
            'analytics_storage': 'denied',
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
        }, 'Should handle different consent states');
        console.log('✓ Test 4: updateGtagConsent handles granted/denied states');

        // Test 5: initializeConsent does nothing if no consent stored
        localStorage.clear();
        gtagCalls = [];
        initializeConsent();
        assert.strictEqual(gtagCalls.length, 0, 'Should not call gtag if no consent stored');
        console.log('✓ Test 5: initializeConsent does nothing if no consent');

        // Test 6: initializeConsent updates gtag if consent stored
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ analytics: true, ads: true }));
        gtagCalls = [];
        initializeConsent();
        assert.strictEqual(gtagCalls.length, 1, 'Should call gtag if consent stored');
        console.log('✓ Test 6: initializeConsent updates gtag if consent stored');

        console.log('All tests passed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error.message);
        process.exit(1);
    }
};

runTests();
