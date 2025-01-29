import fs from 'fs/promises';
import path from 'path';

const FAVORITES_PATH = path.join(process.cwd(), 'data/favorites.json');

export async function readFavorites() {
  try {
    const data = await fs.readFile(FAVORITES_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function writeFavorites(data) {
  try {
    await fs.mkdir(path.dirname(FAVORITES_PATH), { recursive: true });
    await fs.writeFile(FAVORITES_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing favorites:', error);
    return false;
  }
}

export async function getUserFavorites(userId) {
  const data = await readFavorites();
  return data[userId] || [];
}

export async function setUserFavorites(userId, favorites) {
  const data = await readFavorites();
  data[userId] = favorites;
  return writeFavorites(data);
}

export async function addUserFavorite(userId, exercise) {
  const data = await readFavorites();
  const userFavorites = data[userId] || [];
  
  // Check if already exists
  if (!userFavorites.some(fav => fav.id === exercise.id)) {
    userFavorites.push({
      ...exercise,
      addedAt: Date.now()
    });
    data[userId] = userFavorites;
    await writeFavorites(data);
  }
  
  return userFavorites;
}

export async function removeUserFavorite(userId, exerciseId) {
  const data = await readFavorites();
  const userFavorites = data[userId] || [];
  
  data[userId] = userFavorites.filter(fav => fav.id !== exerciseId);
  await writeFavorites(data);
  
  return data[userId];
}
