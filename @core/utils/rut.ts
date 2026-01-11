interface RutFormatOptions {
    dots?: boolean;
    dash?: boolean;
}

/**
 * Cleans a RUT string by removing any dots, dashes and spaces
 */
const cleanRut = (rut: string): string => {
    return rut.toString().replace(/[^0-9kK]/g, '').toLowerCase();
};

/**
 * Calculates the verification digit for a RUT number
 */
const calculateDv = (rut: string): string => {
    const cleanNumber = cleanRut(rut);
    let sum = 0;
    let factor = 2;

    // Iterate from right to left
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        sum += parseInt(cleanNumber[i]) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const dv = 11 - (sum % 11);

    if (dv === 11) return '0';
    if (dv === 10) return 'k';
    return dv.toString();
};

/**
 * Validates if a RUT is valid
 */
const isValidRut = (rut: string): boolean => {
    if (!rut) return false;

    const cleanValue = cleanRut(rut);
    if (cleanValue.length < 2) return false;

    const body = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);

    return calculateDv(body) === dv;
};

/**
 * Formats a RUT string according to Chilean standards
 * @param rut - The RUT to format
 * @param options - Formatting options
 * @returns Formatted RUT string or empty string if invalid
 */
const formatRut = (rut: string, options: RutFormatOptions = { dots: true, dash: true }): string => {
    const cleanValue = cleanRut(rut);
    if (cleanValue.length < 2) return '';

    const body = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);

    // Format body with dots
    let formattedBody = body;
    if (options.dots) {
        formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Add dash before verification digit
    return `${formattedBody}${options.dash ? '-' : ''}${dv}`;
};

// Composable for using RUT formatting in components
export const useRut = () => {
    // Format RUT as user types
    const formatRutInput = (value: string): string => {
        if (!value) return '';
        const formatted = formatRut(value);
        return formatted;
    };

    // Get clean RUT value (for sending to API)
    const getCleanRut = (value: string): string => {
        return cleanRut(value);
    };

    // Validate RUT
    const validateRut = (value: string): boolean => {
        return isValidRut(value);
    };

    return {
        formatRutInput,
        getCleanRut,
        validateRut,
        formatRut
    };
};