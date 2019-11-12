const queryPages = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear) {
    conf: conferenceBrand(where: { title: $conferenceTitle }) {
      id
      status
      year: conferenceEvents(where: { year: $eventYear }) {
        id
        status
        sponsors: pieceOfSponsorInfoes {
          status
          id
          category
          order
          avatar {
              url
            }
          sponsor {
            id
            status
            title
            site
            avatar {
              url
            }
          }
          width
        }
      }
    }
  }
`;

const sortByOrder = (a, b) => {
  const aInd = a.order || 0;
  const bInd = b.order || 0;
  return bInd - aInd;
}

const fetchData = async(client, vars) => {
  const data = await client
    .request(queryPages, vars)
    .then(res => res.conf.year[0].sponsors);

  const sponsorsList = data
    .map(item => ({
      ...item.sponsor,
      ...item,
      avatar: item.avatar || item.sponsor.avatar || {},
    }))
    .map(({ site, avatar, title, width, category }) => ({
      category,
      name: title,
      logo: avatar.url,
      link: site,
      width,
    }));

  const titlesMap = {
    Gold: 'Gold',
    Silver: 'Silver',
    Partner: 'Partners',
  };
  const sponsors = [
    {
      title: 'Platinum',
      mod: 'sponsors-block_xl',
      list: sponsorsList.filter(({ category }) => category === 'Platinum').sort(sortByOrder),
    },
    {
      title: 'Production Partners',
      mod: 'sponsors-block_lg',
      list: sponsorsList.filter(
        ({ category }) => category === 'ProductionPartner'
      ).sort(sortByOrder),
    },
    {
      title: 'Gold',
      mod: 'sponsors-block_lg',
      list: sponsorsList.filter(({ category }) => category === 'Gold').sort(sortByOrder),
    },
  ];

  return {
    sponsors,
  };
};

module.exports = {
  fetchData,
};
