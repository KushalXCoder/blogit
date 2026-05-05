// Controller for settings related API calls

export const verifyDevtoKey = async (devtoKey: string) => {
    const res = await fetch('/api/verify/devto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ devtoKey }),
    });

    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.message || "Verification failed");
    }

    return data;
}