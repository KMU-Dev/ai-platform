export const messages = {
    required: (field: string): string => `${uppercase(field)} is required.`,
    min: (field: string): string => `${uppercase(field)} should exceed \${min} characters.`,
    max: (field: string): string => `${uppercase(field)} cannot exceed \${max} characters.`,
    email: (): string => "You should provide valid email.",
    uuid: (field: string): string => `${uppercase(field)} should be uuid.`,
    oneOf: (field: string): string => `${uppercase(field)} should be one of \${values}.`
}

function uppercase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
