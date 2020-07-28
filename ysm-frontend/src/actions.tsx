import {axiosInstance} from './axios'

/*
 * action types
 */
export const SET_THEMES = 'SET_THEMES';
export const SET_RESOURCES = 'SET_RESOURCES';

/*
 * action creators
 */
export const setThemes = (data: any) => ({
  type: SET_THEMES,
  data,
});
export const setResources = (data: any) => ({
  type: SET_RESOURCES,
  data,
});

export function fetchResources() {
    return async (dispatch: any) => {
      try {
        const response = await axiosInstance.get('resources');
        dispatch(setResources(response.data))
      } catch {
        console.log('error')
      }
    };
  }

  export function fetchThemes() {
    return async (dispatch: any) => {
      try {
        const response = await axiosInstance.get('themes');
        dispatch(setThemes(response.data))
      } catch (err) {
        console.log('error')
        console.log(err)
      }
    };
  }