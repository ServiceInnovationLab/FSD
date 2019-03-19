const uniqueServices = (services, filter) => {
  let uniqueServiceIds = [];
  return services.filter(service => {
    if (uniqueServiceIds.includes(service[filter])) return false;
    uniqueServiceIds.push(service[filter]);
    return service;
  });
};

export default uniqueServices;
