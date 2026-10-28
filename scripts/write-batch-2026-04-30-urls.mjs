#!/usr/bin/env node
/** One-off: write data/batch-2026-04-30-mixed-urls.txt — run from career-ops/: node scripts/write-batch-2026-04-30-urls.mjs */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const lines = `
https://www.stitchfix.com/careers/jobs?gh_jid=7642942&gh_src=03b9fde41
https://job-boards.greenhouse.io/kapitus/jobs/4111270009?gh_src=fUDf4o
https://job-boards.greenhouse.io/ezcaterinc/jobs/5018523007?gh_src=a882cb547us
https://jobs.ashbyhq.com/talkiatry/53750ebb-0311-4f87-88d1-b71c37d5d65b/application?utm_source=v308EzW1za&source=LinkedIn
https://job-boards.greenhouse.io/embed/job_app?for=seatgeek&gh_src=94e407181&source=LinkedIn&token=7073875
https://jobs.dayforcehcm.com/en-US/imgacademy/IMGAcademyCorporateCareers/jobs/9462?source=LinkedIn
https://careers.thrivent.com/jobs/46656/sr-salesforce-engineer/?source=ORG_LI
https://job-boards.greenhouse.io/figma/jobs/5552560004?gh_jid=5552560004&gh_src=28109e334us&source=LinkedIn
https://job-boards.greenhouse.io/coherehealth/jobs/7631730003?gh_src=7ca517e23us
https://job-boards.greenhouse.io/customerio/jobs/7776591?gh_src=258112aa1us
https://job-boards.greenhouse.io/attentive/jobs/4169520009?gh_src=63pk6gu69us
https://dickssportinggoods.wd1.myworkdayjobs.com/DSG/job/Remote---US/Senior-Software-Engineer---Salesforce--DICK-s-Media_202605255?source=LinkedIn-JobBoard&_ccid=1777948196220381ngysua
https://dickssportinggoods.wd1.myworkdayjobs.com/DSG/job/Remote---US/Lead-Software-Engineer---Salesforce--DICK-s-Media--REMOTE-_202604125?source=LinkedIn-JobBoard&_ccid=1777948196220381ngysua
https://www.indeed.com/viewjob?jk=aa81374f258fc366&tk=1jo1l24nljo28801&from=serp&vjs=3
https://www.indeed.com/viewjob?jk=1e8185b7a18809ba&tk=1jo1l24nljo28801&from=serp&vjs=3
https://www.indeed.com/viewjob?jk=20a06b93e45cb700&tk=1jo1l24nljo28801&from=serp&vjs=3
https://recruiting.ultipro.com/SOM1001SOMO/JobBoard/0ceaa0a7-51cb-4208-8eb4-61c3e0efc446/OpportunityDetail?opportunityId=869d3c88-5207-44e4-8ed1-8a4576d074e3
https://www.indeed.com/viewjob?jk=848aec3a5f36ca8a&tk=1jo1mrtaljkj9801&from=jobi2a&advn=7705156721007559&adid=461072687&ad=-6NYlbfkN0Ayfg_adhDMry14INUuujh807JhXIstg7qzKIrkf4FZon6NaEXVBx1RQB6YqbfUGGde_JVph6qd5kBwDFU33ZWxXN_zWfI_T0dYsmQYnr8Kzdj-BgXp_zOi6Y3ZyXgT3yz3wzCM7PO3oGarJ2rCjwThqybBoUlxdmePT36-PDK-vtsoPfRcmYyzJjUFgUev39pP8149cWkVQKQMfDqvjdQ_KZ_bzgkzD_ZLXYhdZUltVelclTWkQ2jA9k97mdwUkPnJFbYgfM-0DPvmfAmDiwkN8M3AgXpaRx5-OQlZ-xNJmpdB3T4RnVt6QCoB9pRj0V5HXcc-NgbOAQmg64ALreYOsGRjPUjR_ItMqiZ4rgvAkmFnpG-fd893Jku51mtiobcLksGgABD4e7hWkPnhYSLvIHiB4bJNsaR56dZvtpHT5MvUsHThOdePs0LZq35qdhw-OCTF5oklk6ooiy6wLmhEpBout-Xv4J3ZjaRLnKOMFjEPiaGs2R5b1FYwGCLqSpviYSrY6DzUCvzBECDSorrYZGw1JY2mibcpvd7Y1EVgkrQENvIRGttUii2mwCpdPjH_ZRdoc17sO3YD0MM_tbWq-pWoVxPQZ2iKfa9TXcLgHzmM6My_CG-Z&pub=21d85ca573e478f5e659e48885c828920cace3277f6b99df&i2af=jobi2a_multijob-en-US_email&camk=C3EPSzFlQw9EMLrV1rSYig%3D%3D&jrtk=5-cmh1-1-1jo1mrslhn514802-848aec3a5f36ca8a&xkcb=SoC36_M3jBlgdHxbch0qbzkdCdPP&xpse=SoB_6_I3jB_1IbQyQ50PbzkdCdPP&xfps=02f947f3-6782-490d-bb30-4e9086a646fa
https://careers.lululemon.com/en_US/careers/JobDetail/Senior-Software-Engineer-Post-Purchase-Experiences/57183?source=LinkedIn&src=LinkedIn
https://explore.jobs.netflix.net/careers/job/790314139983?microsite=netflix.com&utm_source=LinkedIn&domain=netflix.com
https://careers.nordstrom.com/senior-principal-engineer-customer-profile-hybrid-seattle/job/CDCF233BB52E14BF12FA654246483E39?source=LinkedIn
https://job-boards.greenhouse.io/postman/jobs/7715478003?gh_src=7ad26f843us
https://jobs.cvshealth.com/us/en/job/CVSCHLUSR0902107EXTERNALENUS/Staff-Software-Development-Engineer?utm_source=Linkedin&utm_medium=phenom-feeds
https://jobs.tagonline.org/job/senior-lead-software-engineer-alpharetta-ga-dde169ddf7ccd34a55512d5ad2dea521b
https://jobs.ashbyhq.com/Crusoe/8aa35248-14e8-4e05-8a8f-fc482308d90a
https://job-boards.greenhouse.io/possiblefinancialinc/jobs/4928102007?gh_src=ynsung1j7us
https://www.linkedin.com/company/tyler-technologies/jobs/
https://www.linkedin.com/company/pepsico/jobs/
https://careers.docusign.com/careers-home/jobs/28644?lang=en-us&iis=Job%20board&iisn=LinkedIn
https://www.instacart.careers/job?gh_jid=7564947&gh_src=26e143c51
https://job-boards.greenhouse.io/babylist/jobs/5987289004?gh_src=65qeplpq4us
https://greendotcorp.wd1.myworkdayjobs.com/GDC/job/Los-Angeles-California/Lead-Software-Engineer_R3680
https://careers.datadoghq.com/detail/3851927/?gh_jid=3851927&gh_src=8363eca61
https://www.betterment.com/careers/current-openings/job?gh_jid=7184616&gh_jid=7184616
https://about.nextdoor.com/careers-list/?gh_jid=7605357
https://jobs.ashbyhq.com/Lambda/b6d72a53-6a41-44b9-8e7e-383be950dba6?utm_source=Eo1RL8eJpm
https://job-boards.greenhouse.io/clear/jobs/7904350?gh_src=bo8gcsep1us&source=LinkedIn
https://careers.toasttab.com/jobs/senior-principal-software-engineer-go-to-market-experiences-remote-united-states?gh_jid=7791610&gh_src=dbd19ebc1
https://coreweave.com/careers/job?4647664006&board=weights_and_biases&gh_jid=4647664006
https://phf.tbe.taleo.net/phf02/ats/careers/v2/viewRequisition?org=COSTCO&cws=41&rid=10537
https://autodesk.wd1.myworkdayjobs.com/Ext/job/Portland-OR-USA/Principal-Engineer--Backend---Commerce-Platform_26WD96337-2?src=JB-10065&source=LinkedIn
https://apply.careers.microsoft.com/careers/job/1970393556652548?utm_source=mai_linkedin&domain=microsoft.com&source=LinkedIn
https://apply.starbucks.com/careers/job/481078166387?hl=en&utm_source=linkedin_rtl_sup&utm_campaign=linkedin_rtl_sup&domain=starbucks.com&src=JB-12147
https://job-boards.greenhouse.io/gofundme/jobs/7183520?gh_src=6qxy0hq51us&source=LinkedIn
https://workday.wd5.myworkdayjobs.com/Workday/job/USA-CO-Boulder/Sr-Software-Development-Engineer_JR-0104916?source=website_linkedin
https://jobs.ashbyhq.com/superdial/9a394af1-0b73-4c5e-bf76-70c02402e58e/application
https://www.google.com/about/careers/applications/jobs/results/84879485488243398-tech-lead-manager/?src=Online/LinkedIn/linkedin_us&utm_source=linkedin&utm_medium=jobposting&utm_campaign=contract
https://www.metacareers.com/profile/job_details/1187958502273564
https://turo.wd12.myworkdayjobs.com/Turo_careers/job/San-Francisco/Senior-Software-Engineer--API-Services_R-102523?source=LinkedIn
https://jobs.intuit.com/job/-/-/27595/87369441120?cid=pjob_li_click_us_swe-other-fy26_cn_text_job_int-tm&p_sid=vuIskDb&p_uid=jf8AxTXfbC&ss=paid&utm_campaign=&utm_content=pj_board&utm_medium=jobad&utm_source=linkedin+slots+(intuit)
https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/Senior-Methodology-Engineer--Web-Development_JR2013980?source=jobboardlinkedin
https://www.klaviyo.com/careers/jobs/7664323003?gh_jid=7664323003&gh_src=1284ec8c3us
https://job-boards.greenhouse.io/carta/jobs/7656304003?gh_src=a9230cfe3
https://ats.rippling.com/rippling/jobs/d7fae4cb-ee75-4948-ae72-a2527a264f97?jobSite=LinkedIn
https://jobs.ashbyhq.com/plaid/58033600-5c9e-40bc-877e-64479e957a1e/application?utm_source=aZL6JYLDoN&src=linkedin
https://careers.athenahealth.com/us/en/job/ATHAHHUSR14911EXTERNALENUS/Lead-Software-Engineer-Integration-Platform?utm_medium=phenom-feeds&utm_source=Appcast_LinkedIn&_ccid=1777948196220381ngysua
https://job-boards.eu.greenhouse.io/stubhubinc/jobs/4843783101?gh_src=47e65a22teu
https://ripple.com/careers/all-jobs/job/7724653/?gh_jid=7724653&gh_src=0ml94l721us&source=LinkedIn
https://jobs.intuit.com/job/-/-/27595/92462307920?cid=pjob_li_click_us_swe-other-fy26_cn_text_job_int-tm&p_sid=5vpTMJb&p_uid=KvDSPWif7Z&ss=paid&utm_campaign=&utm_content=pj_board&utm_medium=jobad&utm_source=linkedin+slots+(intuit)
https://paypal.eightfold.ai/careers/job/274918743886?hl=en-US&domain=paypal.com&Codes=W-LINKEDIN
https://job-boards.greenhouse.io/discord/jobs/8499094002?gh_src=5117e0c52us
https://job-boards.greenhouse.io/thetradedesk/jobs/5120331007?gh_src=1c01b2067us
https://paypal.eightfold.ai/careers/job/274917628134?hl=en-US&domain=paypal.com&Codes=W-LINKEDIN
https://www.appfolio.com/open-roles?p=job%2Folt2zfw9&__jvst=Job%20Board&__jvsd=LinkedIn&nl=1
https://jobs.us.pwc.com/job/-/-/932/93002511072?utm_source=linkedin.com&utm_campaign=core_media&utm_medium=social_media&utm_content=job_posting&ss=paid&gad_source=7&dclid=CjkKEQjw8PDPBhD-uJv9urXLsvkBEiQApElE4erIM8-5wd3qbOtioHVbHMs9j_jVnP9Tw4WvbfOzMnnw_wcB
https://job-boards.greenhouse.io/affirm/jobs/7471141003?gh_src=689c81d53us
https://curativeai.applytojob.com/apply/6NcMfGaRdU/Senior-Software-Engineer?source=LinkedIn
https://www.pinterestcareers.com/jobs/5601194/senior-software-engineer-fullstack/?source=linkedin_limited_listing&utm_source=linkedin_limited_listing&gh_jid=5601194
https://apply.deloitte.com/en_US/careers/InviteToApply?jobId=329721&source=LinkedIn
https://joinhandshake.com/careers/job/?ashby_jid=676862e8-473a-4fb7-982d-ef2a6246a49d&utm_source=4xDZ2XYAXn
https://www.databricks.com/company/careers/field-engineering---fe-direct-enterprise/sr-solutions-architect---games-8353049002?gh_jid=8353049002&gh_src=62a881d62
https://www.nexhealth.com/careers/open-positions?gh_jid=5546331004&gh_src=a0dc4cd24us
https://www.linkedin.com/company/concoracredit/life/internships/
https://job-boards.greenhouse.io/mozilla/jobs/7863294?gh_src=6eba76201us
https://ralliant.eightfold.ai/careers/job/1133910682543?domain=ralliant.com&utm_source=linkedin&utm_medium=jobboard
https://careers.nordstrom.com/senior-full-stack-software-engineer-digital-servicing-platform-hybrid-seattle/job/A2B3DBAA0CDA2E498DA5CD904919B915?source=LinkedIn
https://salesforce.wd12.myworkdayjobs.com/Slack/job/California---San-Francisco/Senior-Software-Engineer--Frontend-Builds---Tooling---Slack_JR337751?source=LinkedIn_Slack_Jobs
https://careers.chewy.com/us/en/job/CHINUSR27951EXTERNALENUS/Staff-Software-Engineer?utm_source=linkedin&utm_medium=phenom-feeds&gh_src=o8ua3y1
https://careers.airbnb.com/positions/7775710/?gh_src=34ewj2
https://apply.starbucks.com/careers/job/481078023801?hl=en&utm_source=linkedin_rtl_sup&utm_campaign=linkedin_rtl_sup&domain=starbucks.com&src=JB-12147
https://ebgj.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/Pella-Careers/job/251284
https://job-boards.greenhouse.io/aloyoga/jobs/5779592004?gh_jid=5779592004&gh_src=q0afblmh4us
https://join.sephora.com/careers/job/790314757551?utm_source=linkedin&domain=sephora.com
https://www.nexhealth.com/careers/open-positions?gh_jid=5803934004&gh_src=a0dc4cd24us
https://jobs.crateandbarrel.com/job/-/-/351/93224571696?utm_source=linkedin.com&utm_campaign=crate&utm_medium=social_media&utm_content=job_posting&ss=paid&source=rd_linkedin&gad_source=7&dclid=CjkKEQjw8PDPBhD-uJv9urXLsvkBEiQApElE4SPaxxcr27mNuLrmvMEgqsisHbWryfEl_MAw-mqaWqHw_wcB
https://careers.lululemon.com/en_US/careers/JobDetail/Senior-Platform-Engineer-API/57631?source=LinkedIn&src=LinkedIn
https://job-boards.greenhouse.io/gusto/jobs/7760341?gh_src=80fddc691us
https://builtin.com/job/senior-software-engineer/4458879
https://builtin.com/job/software-engineer-ii/9022321
https://builtin.com/job/senior-software-engineer-full-stack/4446302
https://builtin.com/job/sr-software-engineer-fullstack/9274601
https://builtin.com/job/senior-software-engineer/8016828
https://builtin.com/job/senior-software-engineer/8777452
https://builtin.com/job/senior-software-engineer-tech-lead-customer-domain-engineering/9273638
https://builtin.com/job/senior-software-engineer-tech-lead-customer-domain-engineering/9273646
https://builtin.com/job/senior-software-engineer-tech-lead-customer-domain-engineering/9273639
https://builtin.com/job/senior-software-engineer-atlas-clusters-platform/9273514
https://builtin.com/job/senior-software-engineer-engineering-enablement/9272323
https://builtin.com/job/senior-release-engineer-platform-delivery/8206682
https://jobs.bayer.com/job/Residence-Based-Staff-Software-Engineer-Resi/1230618101/?utm_source=LINKEDIN&utm_medium=referrer
`.trim()
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.startsWith('http'));

const out = resolve(ROOT, 'data/batch-2026-04-30-mixed-urls.txt');
writeFileSync(out, `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${lines.length} URLs to ${out}`);
