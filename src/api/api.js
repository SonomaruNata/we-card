export const fetchCards = async () => {
    const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }
    const data = await response.json();
    return data;
  };
  