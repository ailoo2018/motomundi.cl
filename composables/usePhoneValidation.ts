export const usePhoneValidation = () => {
    // Validates phone number format
    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^\+?[0-9]{8,15}$/;
        return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
    };

    // Formats phone number while typing
    const formatPhone = (phone: string): string => {
        // Remove all non-digit characters except '+'
        let cleaned = phone.replace(/[^\d+]/g, '');

        // Ensure '+' only appears at the start
        if (cleaned.includes('+') && !cleaned.startsWith('+')) {
            cleaned = cleaned.replace(/\+/g, '');
        }

        // Limit length
        if (cleaned.startsWith('+')) {
            cleaned = '+' + cleaned.slice(1).slice(0, 15);
        } else {
            cleaned = cleaned.slice(0, 15);
        }

        // Format with separators and parentheses
        let formatted = '';
        if (cleaned.startsWith('+')) {
            // International format: (+XX) XXX XXX XXXX
            // Extract country code (assuming 2-3 digits after '+')
            const countryCodeMatch = cleaned.match(/^\+(\d{2,3})/);
            if (countryCodeMatch) {
                const countryCode = countryCodeMatch[1];
                const rest = cleaned.slice(countryCode.length + 1); // +1 for the '+' symbol

                formatted = `(+${countryCode})`;
                if (rest.length > 0) {
                    formatted += ' ' + rest.match(/.{1,3}/g)?.join(' ');
                }
            } else {
                formatted = cleaned; // Fallback if no valid country code
            }
        } else {
            // Local format: XXX XXX XXXX
            if (cleaned.length <= 3) {
                formatted = cleaned;
            } else if (cleaned.length <= 6) {
                formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
            } else {
                formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
            }
        }

        return formatted.trim();
    };


    return {
        validatePhone,
        formatPhone
    };
};