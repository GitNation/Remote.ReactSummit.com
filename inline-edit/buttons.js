const projectId = '8be1ceff148c4b749e78b34007f9cc34';
const projectStage = 'master';

const createEntryURL = ({ id, contentTypeId }) => {
  const url = `https://legacy.graphcms.com/${projectId}/${projectStage}/content/${contentTypeId}/table/${id}`;
  return url;
};

const getContentTypeName = contentTypeMap => contentTypeId => {
  const type = Object.entries(contentTypeMap).find(
    // eslint-disable-next-line no-unused-vars
    ([_, id]) => id === contentTypeId
  );
  if (!type) return 'unknown';
  return type[0];
};

const addHook = element => {
  const hook = document.createElement('div');
  hook.classList.add('graphcms-container__hook');
  element.insertBefore(hook, element.firstElementChild);
  return hook;
};

const addLink = ({
  element,
  id,
  contentTypeId,
  typeName,
  altClassName = '',
}) => {
  const link = document.createElement('a');
  link.classList.add('graphcms-container__edit-button');
  if (altClassName) {
    link.classList.add(altClassName);
  }
  link.href = createEntryURL({ id, contentTypeId });
  link.innerHTML = `<div class="edit-icon"></div><div class="edit-text">${typeName}</div>`;
  link.target = '_blank';
  link.title = `id: ${id}`;
  element.appendChild(link);
  return link;
};

const addButtonTo = getTypeName => element => {
  const { id, contentType, idAlt, contentTypeAlt } = element.dataset;
  const hook = addHook(element);
  const typeName = getTypeName(contentType);
  addLink({ element: hook, id, contentTypeId: contentType, typeName });
  if (contentTypeAlt) {
    const typeNameAlt = getTypeName(contentTypeAlt);
    addLink({
      element: hook,
      id: idAlt,
      contentTypeId: contentTypeAlt,
      typeName: typeNameAlt,
      altClassName: 'alt',
    });
  }
};

export const injectButtons = contentTypeMap => {
  const cmsContainers = [...document.querySelectorAll('[data-content-type]')];
  cmsContainers.forEach(addButtonTo(getContentTypeName(contentTypeMap)));
};
