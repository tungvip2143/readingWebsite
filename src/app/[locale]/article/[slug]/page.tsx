'use client';
import CommonStylesClient from 'components/Client/CommonStylesClient';
import { MAX_WIDTH_CONTAINER, Topic } from 'constants/common';
import React from 'react';
import BreadcrumbArticle from '../components/BreadcrumbArticle';

const data = {
  id: 1,
  titleArticle:
    '‘Pets Are Family’: Animal Rescue Groups Call On Expats Leaving Vietnam To Not Abandon Pets',
  articleBackground: {
    url: 'https://cdn-resize-img.vietcetera.com/_next/image?url=https%3A%2F%2Fimg.vietcetera.com%2Fuploads%2Fimages%2F26-aug-2021%2Fshutterstock-1548632363-2-min.jpg&q=80&w=1152',
    content:
      "Transporting pets can be costly and time-consuming. But it's not a good reason to just leave them behind. | Source: Shutterstock",
  },
  topicArticle: Topic.EVENTS,
  subtitleArticle:
    "The pandemic has forced many expats to leave Vietnam. But the situation's trickier for those who own pets.",
  contentArticle: `<div>
  <p>It was a scorching Friday orning. Tamryn and her partner, JP, travelled from Vung Tau to Tan Son Nhat International Airport in Ho Chi Minh City, about 90 kilometers away, for their flight to Johannesburg. They didn&rsquo;t want to leave Vietnam, but the COVID-19 pandemic has brought complications to <a href="https://vietcetera.com/en/stricter-labor-policy-is-making-expats-rethink-their-future-in-vietnam">visa policies</a>&nbsp;for expatriates, and the couple were left with no other choice.&nbsp;</p>
  <p>Loaded in the car they&rsquo;ve rented were their big suitcases, backpacks and two pet carriers - where their ginger cats Ozzy and Todd were calmly sleeping. Unfortunately, as much as they hoped for, their cats won&rsquo;t be going with them to South Africa...yet. They handed Ozzy and Todd, both more than a year old, to their chosen foster owners. Bidding a tearful goodbye to the cats they&rsquo;ve cared for for more than a year now was a hard decision to make. But they&rsquo;re hoping to see them again in two months or so, once their export and import permits get granted and their flights approved.</p>
  <p>&ldquo;We had to check with our home country what the requirements were for bringing animals home and once we knew exactly what we needed we started preparing ourselves and them. To get all documents and permits ready, the cats needed microchips done, as well as rabies vaccinations and other necessary health certificates for them to enter South Africa,&rdquo; said Tamryn.</p>
  <p>But the cost of flying cats to other countries doesn't come cheap. For their two ginger cats, the couple needed to prepare $2000-$4000.</p>
  <p>&ldquo;They will hopefully be flying in two to three months as the cost is quite high to get them home.&rdquo;&nbsp;</p>
  <p>The number of expatriates leaving has increased in recent months. Many of them lost their jobs as several companies closed down or temporarily shut operations. Some would have wanted to stay and wait until the outbreak wanes, but changes in visa extension regulations have become a problem.</p>
  <p>&ldquo;Provincial and municipal authorities should consider deporting foreign workers without work permits or those failing to comply with entry and exit rules applicable to foreigners in Vietnam,&rdquo; said Dao Ngoc Dung, Minister of Labor, Invalids and Social Affairs back in May.</p>
  <p>Most expats, who used to rely on renewable 3-month business visas, can now only get a 15-day extension at a hefty cost.</p>
  <p>But for many foreign workers in Vietnam who own dogs, cats and other pets, the situation is trickier. Because of the high cost of transporting pets overseas, some have opted to leave their pets behind &mdash; either to new owners, animal rescue organizations or, unfortunately, on the streets.</p>
  <figure><picture><source srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min-768x427.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min-375x213.jpg 1x" media="(max-width: 568px)" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min-768x427.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min-375x213.jpg 1x" /><source srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min-768x427.jpg 1x" media="(min-width: 569px)" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min-768x427.jpg 1x" /><img style="height: auto; width: 768px;" title="Cats abandoned on streets | Source Shutterstock" src="blob:https://www.tiny.cloud/5841f7cc-0447-4c4a-bf77-d7c04e010bc5" srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min.jpg" alt="" width="2000" height="1125" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1705013983-min.jpg" /></picture>
  <figcaption>Cats abandoned on streets. | Source: Shutterstock</figcaption>
  </figure>
  <p>&ldquo;Ever since the pandemic started, we&rsquo;ve seen more abandoned cats on streets. And in the last three months or so, as the new outbreak worsens, expats have been posting on social media about how they&rsquo;re forced to give up on their pets,&rdquo; admitted CJ van Vuuren, founder of AWAsome - Animal Welfare Awareness Movement and Cat Sanctuary.</p>
  <p>CJ said her organization is currently housing 60 cats, some were found on the streets, some were dropped off to her gate. She isn&rsquo;t sure when they can get people who&rsquo;d be willing to adopt the cats, given the movement restrictions and the exodus of expats.</p>
  <p>&ldquo;Before, we&rsquo;d have one or two cats adopted every week. But because of the current situation, no more adoptions are happening. In the whole of August, we only had two adoptions - that&rsquo;s it.&rdquo;</p>
  <p>While CJ finds it disheartening to see pets getting abandoned, she admitted that exporting cats can be expensive and time-consuming, especially to countries like Australia and New Zealand, where the cost can go up to $20,000. &ldquo;It&rsquo;s a long and difficult process, pretty much impossible.&rdquo;</p>
  <p>Dog rescue group Laws for Paws is experiencing the same thing. The organization, which rehabilitates and rehomes dogs that have been abused, abandoned or are injured, has seen increasing cases of pet abandonment.</p>
  <p>&ldquo;The biggest impact is we are unable to get out onto the street to rescue dogs in distress. Before the new regulations that came out late last week we were still able to get dogs to vet clinics by using kind people who had permits to deliver food to frontline workers. We rescued a dog who had been hit by a car in Thu Duc and another dog who was starving on the street in D1 as there are no restaurants or street vendors to feed these dogs anymore. But now we have no help helping dogs on the street,&rdquo; said Elizabeth Homfray, founding director of Laws for Paws.</p>
  <p>&ldquo;Another big impact is we are no longer able to do adoptions. Usually we average 10 adoptions a month and this has come to a grinding halt! We now find we have more dogs that we had budgeted for and are desperately raising funds to help feed them and make sure we can still cover our monthly costs,&rdquo; she said.</p>
  <p>The rescue organization is now overwhelmed with abandoned dogs, and can no longer afford to take in more, no matter how much they want to. Elizabeth calls expat dog owners to not leave their dogs when they fly back home.</p>
  <p>&ldquo;Having desperate pet owners who have left, moving their pet to the last minute and now are looking to us to solve the problem are being selfish. Their pets have given them so much joy and comfort so they deserve better! Some expat pet owners have even threatened to kill their pets unless rescue groups take them!&rdquo;&nbsp;</p>
  <figure><picture><source srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min-768x427.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min-375x213.jpg 1x" media="(max-width: 568px)" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min-768x427.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min-375x213.jpg 1x" /><source srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min-768x427.jpg 1x" media="(min-width: 569px)" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min-768x427.jpg 1x" /><img style="height: auto; width: 768px;" title="Pets dogs especially build a special connection with humans And getting them separated from their owners can cause long-term trauma Source Shutterstock" src="blob:https://www.tiny.cloud/6c598c5f-3940-4b23-915a-7dbcc96aad6c" srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min.jpg" alt="" width="2000" height="1125" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1833160129-min.jpg" /></picture>
  <figcaption>Pets, dogs especially, build a special connection with humans. And getting them separated from their owners can cause long-term trauma. Source: Shutterstock</figcaption>
  </figure>
  <p>Elizabeth said there are people and groups who are willing to donate financial resources to help cover the cost to move dogs abroad, pet owners just need to find ways and be patient with the process.</p>
  <p>And because dogs weigh more than cats, the cost of transporting the former is also more expensive. At present, a medium-sized dog can be charged $4000 to $8000. The organization&rsquo;s working hard to help owners complete all documents needed to rehome their dogs, but &ldquo;shipping agents can&rsquo;t get to the government office to process papers.&rdquo;</p>
  </div>
  <div>
  <h2>&lsquo;Pets are family&rsquo;</h2>
  <p>Pets are man&rsquo;s constant companion. For expats especially, having a furry friend helps alleviate homesickness and relieve stress and anxiety. They give off a warm feeling &mdash; a comforting vibe that lets their owners know they aren&rsquo;t alone in a foreign land.</p>
  <p>&ldquo;But the moment you get a pet, you need to make sure you can take care of them. That whatever happens, you know you can take them home with you,&rdquo; said a representative from ARC Vietnam Animal Rescue &amp; Care, a 100% charity-run organization. ARC, which relies on donations and volunteers to operate, has been working tirelessly amidst a worsening COVID-19 outbreak to rescue pets from F0 apartments. The organization has partnered with several other groups like Pinky House and Bed and Pet for pet boarding and transportation.</p>
  <p>But while they&rsquo;ve received several messages from people who wanted to adopt their rescues, they have not been able to hand them over to their new families because of the strict social distancing measures.</p>
  <p>ARC accepts animals that can&rsquo;t be cared for by their owners, but the organization encourages people to try all means possible to not end up abandoning their pets.</p>
  <p>&ldquo;Pets are family, they are loyal, and they really are heartbroken when they get abandoned. They bond so easily with their owners and are absolutely heartbroken when they get abandoned. It can often be extremely traumatic for them, and they take a long time to recover from it.&rdquo;</p>
  </div>
  <div>
  <h2>What you need to prepare to transport your pets</h2>
  <p>Each country has different rules and regulations on importing pets. Animal rescue organizations suggest that owners should check their country of destination for documents needed to ensure a safe and hassle-free trip for animals.</p>
  <figure><picture><source srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min-768x427.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min-375x213.jpg 1x" media="(max-width: 568px)" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min-768x427.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min-375x213.jpg 1x" /><source srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min-768x427.jpg 1x" media="(min-width: 569px)" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min.jpg 2x, https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min-768x427.jpg 1x" /><img style="height: auto; width: 768px;" title="Transport costs can vary depending on the kind of animal you&rsquo;re transporting its breed weight and height and where you&rsquo;re taking it to | Source Shutterstock" src="blob:https://www.tiny.cloud/a21ea1c9-edd6-440d-84a5-1b1afd838304" srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min.jpg" alt="" width="2000" height="1125" data-srcset="https://img.vietcetera.com/uploads/images/26-aug-2021/shutterstock-1897935901-min.jpg" /></picture>
  <figcaption>Transport costs can vary depending on the kind of animal you&rsquo;re transporting, its breed, weight and height and where you&rsquo;re taking it to. | Source: Shutterstock</figcaption>
  </figure>
  <p>As mentioned above, it can break the bank, and it requires maximum patience. While people only need to get their plane tickets ready (and a valid negative COVID-19 test), animals need several permits and health certificates before they can get into the cabin or in the cargo hold.</p>
  <p>&ldquo;It&rsquo;s expensive. And it really depends on how much you&rsquo;re willing to do and pay,&rdquo; said CJ. But it&rsquo;s an investment worth every penny, and most importantly, the most righteous thing to do.</p>
  <p>Costs can also vary, depending on the kind of animal you&rsquo;re transporting, its breed, weight and height and where you&rsquo;re taking it to. It&rsquo;s worth noting that there are breeds that aren&rsquo;t suitable for transport. Brachycephalic or short-faced cats and dogs are generally at greater risk of heat stress as they can&rsquo;t handle the air pressure inside planes.</p>
  <p>Generally, here are the things you need to prepare to get a &ldquo;pet passport&rdquo;:</p>
  <ul style="list-style-type: initial;">
  <li>
  <p>Blood tests</p>
  </li>
  <li>
  <p>Vaccinations</p>
  </li>
  <li>
  <p>Microchips for identification</p>
  </li>
  <li>
  <p>Comfortable and sturdy carrier (Airlines have different requirements for carriers)</p>
  </li>
  <li>
  <p>Export and import documentations</p>
  </li>
  <li>
  <p>Food and water supply (It&rsquo;s important to seek advice from reliable veterinarians on the right time to feed cats in long flights)</p>
  </li>
  <li>
  <p>Confirmed flight ticket</p>
  </li>
  </ul>
  <p>Rescue organizations like AWAsome, Laws for Paws and ARC have an extensive list of reliable veterinary clinics and shipping companies that can help facilitate pet transport.&nbsp;</p>
  <p>According to CJ, getting export permit and rabies certificate for cats bound for South Africa, the US and Canada can cost up to $600. Prices of plane/cargo tickets depend on the airline. For those bound for the UK and Great Britain, it&rsquo;s advisable to fly via France, which is an easier route. Owners should prepare at least $3000 for each cat, and they should start preparing months before their departure.</p>
  <p>As in most cases when it&rsquo;s impossible to have pets travel with owners, handing them over to a trusted friend for foster or to pet boarding centers can be the most ideal options as owners wait for their pets to reach home.</p>
  </div>
  </div>
  </div>
  </div>`,
  createdAt: '',
};
const ArticleDetail = () => {
  //! State
  const createMarkup = () => ({ __html: data?.contentArticle });
  //! Function
  //! Render
  return (
    <CommonStylesClient.Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        maxWidth: MAX_WIDTH_CONTAINER,
      }}
    >
      <BreadcrumbArticle topic={data?.topicArticle} />
      <CommonStylesClient.Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CommonStylesClient.Typography type='pcHeading3'>
          {data?.titleArticle}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Typography type='title16Medium'>
          {data?.subtitleArticle}
        </CommonStylesClient.Typography>
        <CommonStylesClient.Box>
          <img
            src={data?.articleBackground?.url}
            alt={data?.titleArticle}
            style={{ width: '100%', height: 'auto' }}
          />
          <CommonStylesClient.Typography type='normal'>
            {data?.articleBackground?.content}
          </CommonStylesClient.Typography>
        </CommonStylesClient.Box>
        <CommonStylesClient.Box>
          <CommonStylesClient.Box dangerouslySetInnerHTML={createMarkup()} />
        </CommonStylesClient.Box>
      </CommonStylesClient.Box>
    </CommonStylesClient.Box>
  );
};

export default ArticleDetail;
