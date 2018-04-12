import { isNil, has } from 'lodash';

export default {
    validate(project) {
        if (!has(project, 'title') || !has(project, 'rootDir') || !has(project, 'user')) {
            const err = new Error();
            err.name = 'ProjectMissingData';
            err.message = 'Some project properties are missing from the project object passed';
            err.code = 0;
            err.level = 'error';
            return err;
        }
        return null;
    },
    save(project) {
        try {
            const isInvalid = projectsApi.validate(project);
            if (isInvalid) return isInvalid;

            const projectString = JSON.stringify(project);
            window.localStorage.setItem('myTrello/project', projectString);
        } catch (e) {
            projectsApi.remove();

            const err = new Error();
            err.name = 'ProjectAdditionError';
            err.message = 'Something went wrong while saving your project. Data seems to be damaged.';
            err.code = 0;
            err.level = 'error';
            return err;
        }
    },
    retrieve() {
        try {
            const savedProject = window.localStorage.getItem('myTrello/project');
            const project = JSON.parse(savedProject);
            return project;
        } catch (e) {
            projectsApi.remove();

            const err = new Error();
            err.name = 'ProjectDataDamage';
            err.message = 'Something went wrong while retrieving your project. Data seems to be damaged';
            err.code = 0;
            err.level = 'error';
            return err;
        }
    },
    remove() { window.localStorage.removeItem('myTrello/project'); }
};