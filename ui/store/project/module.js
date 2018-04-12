import { isNil } from 'lodash';
import Api from './api';

export default {
    namespaced: true,
    state: {
        project: { title: '', rootDir: '', user: '' },
        error: null
    },
    mutations: {
        load: (state, project) => {
            state.project = Object.assign({}, project);
        },
        error: (state, error) => {
            if (isNil(error)) {
                state.error = null;
            } else {
                state.error = Objec.assign({}, state.error, error);
            }
        },
        reset: (state) => {
            state.project = { title: '', rootDir: '', user: '' };
        }
    },
    actions: {
        addProject(ctx, project) {
            console.log('am called');
            const isInvalid = Api.validate(project);
            if (isInvalid) {
                ctx.commit('error', project);
                return;
            }
            Api.save(project);
            ctx.commit('load', project);
            return;
        },
        clearProject(ctx) {
            Api.remove();
            ctx.commit('reset');
            return;
        },
        throwProjectError(ctx, err) {
            ctx.commit('error', err);
            return;
        },
        getProject(ctx) {
            const project = Api.retrieve();
            if (isError(project)) {
                ctx.commit('error', project);
                return;
            }
            if (!isNil(project) && !isEmpty(project)) {
                ctx.commit('load', project);
                return;
            }
        }
    },
    getters: {
        project: state => state.project,
        error: state => state.error
    }
};
