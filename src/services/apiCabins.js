import supabase, { supabaseUrl } from './supabase';
import { toast } from 'react-hot-toast';
import { PAGE_SIZE } from '../utils/constans';

export async function getCabins({ page }) {
  let query = supabase.from('cabins').select('*', { count: 'exact' });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    toast.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return { data, error, count };
}

export async function createCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    toast.error(error.message);
    throw new Error('Cabins could not be created');
  }

  if (hasImagePath) return data;

  if (newCabin?.image && newCabin?.image !== 'NULL') {
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);

      toast.error(storageError.message);
      throw new Error('Cabins image could not be uploaded and cabin was not created');
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    toast.error(error.message);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}
