import { combineReducers } from 'redux';
import { richTextHelper} from './shared/rich-text'
import {
  SET_THEMES,
  SET_RESOURCES
} from './actions';


const themes = (state = [], action: any) => {
  let newState: { description: any; id: any; slug: any; title: any; }[] = [];
  switch (action.type) {
    case SET_THEMES:
      action.data.forEach((data: any)=> {
        newState.push({
          description: richTextHelper(data.description),
        id: data.id,
      slug: data.slug,
    title: data.title})
      })
      return newState;
    default:
      return state;
  }
};

const resources = (state = [], action: any) => {
  switch (action.type) {
    case SET_RESOURCES:
      return action.data;
    default:
      return state;
  }
};

const ysmApp = combineReducers({
  themes,
  resources,
});

export default ysmApp;
