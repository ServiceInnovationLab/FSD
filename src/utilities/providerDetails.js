const providerDetails = provider => {
  if (provider === null || typeof provider === undefined) {
    return {};
  } else {
    return {
      address: provider.PHYSICAL_ADDRESS,
      availability: provider.PROVIDER_CONTACT_AVAILABILITY,
      classification: provider.PROVIDER_CLASSIFICATION,
      email: provider.PUBLISHED_CONTACT_EMAIL_1,
      fsdId: provider.FSD_ID,
      name: provider.PROVIDER_NAME,
      phone: provider.PUBLISHED_PHONE_1,
      purpose: provider.ORGANISATION_PURPOSE,
      website: provider.PROVIDER_WEBSITE_1,
    };
  }
};

export default providerDetails;
