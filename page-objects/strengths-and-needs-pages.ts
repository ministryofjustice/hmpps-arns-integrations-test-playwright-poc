import { expect, Locator, Page } from '@playwright/test';

const { chromium } = require('playwright');

let newTabGlobal: Page | null = null;

export class StrengthsAndNeedsLandingPage {
    constructor(
        private page: Page,
    ) { }

    async checkPageTitle() {
        const newTabPromise = this.page.waitForEvent('popup');
        const newTab = await newTabPromise;
        //wait for Load 
        await newTab.waitForLoadState();
        newTabGlobal = newTab;
        await expect(newTab).toHaveTitle('Strengths and needs');
    }

    async validationErrorDisplays() {
        await expect (newTabGlobal!.getByRole('alert')).toBeVisible();
    }

    // Accomodation

    async tickSettled() {
        await newTabGlobal!.locator('#current_accommodation').check();
    }

    async tickHomeowner() {
        await newTabGlobal!.locator('#type_of_settled_accommodation').check();
    }

    async tickLivingWithFamily() {
        await newTabGlobal!.locator('#living_with').check();
    }

    async tickSuitableHousingLocation() {
        await newTabGlobal!.locator('#suitable_housing_location').check();
    }

    async tickSuitableHousing() {
        await newTabGlobal!.locator('#suitable_housing').check();
    }

    async tickAccomodationChanges() {
        await newTabGlobal!.locator('#accommodation_changes').check();
    }

    async clickSaveAndContinueButton() {
        await newTabGlobal!.getByRole('button', { name: 'Save and continue' }).click();
    }

    async clickPracticionerAnalysisTab() {
        await newTabGlobal!.locator('#tab_practitioner-analysis').click();
    }

    async tickAccomodationFactors() {
        await newTabGlobal!.locator('#accommodation_practitioner_analysis_strengths_or_protective_factors-2').check();
    }

    async tickRiskOfHarm() {
        await newTabGlobal!.locator('#accommodation_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickRiskOfReoffending() {
        await newTabGlobal!.locator('#accommodation_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async clickMarkAsComplete() {
        await newTabGlobal!.getByRole('button', { name: 'Mark as complete' }).click();
    }

    async checkSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Accommodation ✓' })).toBeVisible();
    }

    // Employment

    async clickEmploymentAndEducationLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Employment and education' }).click();
    }

    async tickEmployed() {
        await newTabGlobal!.locator('#employment_status').check();
    }

    async tickFullTime() {
        await newTabGlobal!.locator('#employment_type').check();
    }

    async tickContinuousEmployment() {
        await newTabGlobal!.locator('#employment_history').check();
    }

    async tickCaringResponsibilities() {
        await newTabGlobal!.locator('#employment_other_responsibilities').check();
    }

    async tickEntryLevel() {
        await newTabGlobal!.locator('#education_highest_level_completed').check();
    }

    async tickNoVocationalQualifications() {
        await newTabGlobal!.locator('#education_professional_or_vocational_qualifications-2').check();
    }

    async tickTransferrableSkills() {
        await newTabGlobal!.locator('#education_transferable_skills').check();
    }

    async tickNoDifficultyReading() {
        await newTabGlobal!.locator('#education_difficulties-5').check();
    }

    async tickPositiveEmploymentExperience() {
        await newTabGlobal!.locator('#employment_experience').check();
    }

    async tickPositiveExperienceOfEducation() {
        await newTabGlobal!.locator('#education_experience').check();
    }

    async tickIHaveAlreadyMadeChanges() {
        await newTabGlobal!.locator('#employment_education_changes').check();
    }

    async tickEmploymentFactors() {
        await newTabGlobal!.locator('#employment_education_practitioner_analysis_strengths_or_protective_factors-2').check();
    }

    async tickEmploymentRiskOfHarm() {
        await newTabGlobal!.locator('#employment_education_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickEmploymentRiskOfReoffending() {
        await newTabGlobal!.locator('#employment_education_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async checkEmploymentSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Employment and education ✓' })).toBeVisible();
    }

    // Finances

    async clickFinancesLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Finances' }).click();
    }

    async tickCarersAllowance() {
        await newTabGlobal!.locator('#finance_income').check();
    }

    async tickOwnBankAccount() {
        await newTabGlobal!.locator('#finance_bank_account').check();
    }

    async tickAbleToManageMoney() {
        await newTabGlobal!.locator('#finance_money_management').check();
    }

    async tickFinanceGambling() {
        await newTabGlobal!.locator('#finance_gambling').check();
    }

    async tickOwndebt() {
        await newTabGlobal!.locator('#finance_debt').check();
    }

    async tickDebtToOthers() {
        await newTabGlobal!.locator('#yes_type_of_debt').check();
    }

    async tickFinanceIHaveAlreadyMadechanges() {
        await newTabGlobal!.locator('#finance_changes').check();
    }

    async tickFinanceFactors() {
        await newTabGlobal!.locator('#finance_practitioner_analysis_strengths_or_protective_factors-2').check();
    }

    async tickFinanceRiskOfHarm() {
        await newTabGlobal!.locator('#finance_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickFinanceRiskOfReoffending() {
        await newTabGlobal!.locator('#finance_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async checkFinanceSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Finances ✓' })).toBeVisible();
    }

    // Drug use

    async clickDrugUseLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Drug use' }).click();
    }

    async tickNoDrugUse() {
        await newTabGlobal!.locator('#drug_use-2').check();
    }

    async tickDrugFactors() {
        await newTabGlobal!.locator('#drug_use_practitioner_analysis_strengths_or_protective_factors-2').check();
    }

    async tickDrugRiskOfHarm() {
        await newTabGlobal!.locator('#drug_use_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickDrugRiskOfReoffending() {
        await newTabGlobal!.locator('#drug_use_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async checkDrugSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Drug use ✓' })).toBeVisible();
    }

    // Alcohol use

    async clickAlcoholUseLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Alcohol use' }).click();
    }

    async tickNoAlcoholUse() {
        await newTabGlobal!.locator('#alcohol_use-3').check();
    }

    async tickPhysicalHealthCondition() {
        await newTabGlobal!.locator('#health_wellbeing_physical_health_condition').check();
    }

    async tickAlcoholFactors() {
        await newTabGlobal!.locator('#alcohol_use_practitioner_analysis_strengths_or_protective_factors-2').check();
    }

    async tickAlcoholRiskOfHarm() {
        await newTabGlobal!.locator('#alcohol_use_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickAlcoholRiskOfReoffending() {
        await newTabGlobal!.locator('#alcohol_use_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async checkAlcoholSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Alcohol use ✓' })).toBeVisible();
    }
    
    // Health and wellbeing

    async clickHealthAndWellbeingLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Health and wellbeing' }).click();
    }

    async tickHealthPhysicalHealthCondition() {
        await newTabGlobal!.locator('#health_wellbeing_physical_health_condition').check();
    }

    async tickMentalHealthCondition() {
        await newTabGlobal!.locator('#health_wellbeing_mental_health_condition').check();
    }

    async tickPsychiatricTreatment(){
        await newTabGlobal!.locator('#health_wellbeing_psychiatric_treatment').check();
    }

    async tickHeadInjury() {
        await newTabGlobal!.locator('#health_wellbeing_head_injury_or_illness').check();
    }

    async tickNeuroDiverseCondition() {
        await newTabGlobal!.locator('#health_wellbeing_neurodiverse_conditions').check();
    }

    async tickLearningDifficulties() {
        await newTabGlobal!.locator('#health_wellbeing_learning_difficulties').check();
    }

    async tickCoping() {
        await newTabGlobal!.locator('#health_wellbeing_coping_day_to_day_life').check();
    }

    async tickAttitudeTowardsSelf() {
        await newTabGlobal!.locator('#health_wellbeing_attitude_towards_self').check();
    }

    async tickNoSelfHarm() {
        await newTabGlobal!.locator('#health_wellbeing_self_harmed-2').check();
    }

    async tickNoSuicidalThoughts() {
        await newTabGlobal!.locator('#health_wellbeing_attempted_suicide_or_suicidal_thoughts-2').check();
    }

    async tickOptimisticAboutFuture() {
        await newTabGlobal!.locator('#health_wellbeing_outlook').check();
    }

    async tickHealthPositiveFactors() {
        await newTabGlobal!.locator('#health_wellbeing_positive_factors').check();
    }

    async tickHealthAlreadyMakingChanges() {
        await newTabGlobal!.locator('#health_wellbeing_changes').check();
    }

    async tickHealthFactors() {
        await newTabGlobal!.locator('#health_wellbeing_practitioner_analysis_strengths_or_protective_factors-2').check();
    }

    async tickHealthRiskOfHarm() {
        await newTabGlobal!.locator('#health_wellbeing_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickHealthRiskOfReoffending() {
        await newTabGlobal!.locator('#health_wellbeing_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async checkHealthSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Health and wellbeing ✓' })).toBeVisible();
    }

    // Personal relationships and community

    async clickPersonalRelationshipsLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Personal relationships and community' }).click();
    }

    async tickYesChildrenLiving() {
        await newTabGlobal!.locator('#personal_relationships_community_children_details').check();
    }

    async fillInInfoAboutChildren() {
        await newTabGlobal!.locator('#personal_relationships_community_children_details_yes_children_living_with_pop_details')
        .fill('child 1');
    }

    async tickPartnerImportantPeople() {
        await newTabGlobal!.locator('#personal_relationships_community_important_people').check();
    }

    async tickHappyWithRelationship() {
        await newTabGlobal!.locator('#personal_relationships_community_current_relationship').check();
    }

    async tickStableRelationship() {
        await newTabGlobal!.locator('#personal_relationships_community_intimate_relationship').check();
    }

    async tickStableFamilyRelationship() {
        await newTabGlobal!.locator('#personal_relationships_community_family_relationship').check();
    }

    async enterChallengesInRelationshipsDetails() {
        await newTabGlobal!.locator('#personal_relationships_community_challenges_intimate_relationship')
        .fill('person is comfortable addressing challenges.');
    }

    async tickPositiveChildhood() {
        await newTabGlobal!.locator('#personal_relationships_community_childhood').check();
    }

    async tickChildBehaviouralProblem() {
        await newTabGlobal!.locator('#personal_relationships_community_childhood_behaviour').check();
    }

    async tickPersonalRelationshipsAlreadyMakingChanges() {
        await newTabGlobal!.locator('#personal_relationships_community_changes').check();
    }

    async tickPersonalRelationshipsFactors() {
        await newTabGlobal!.locator('#personal_relationships_community_practitioner_analysis_strengths_or_protective_factors-2').check();
    }

    async tickPersonalRelationshipsRiskOfHarm() {
        await newTabGlobal!.locator('#personal_relationships_community_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickPersonalRelationshipsRiskOfReoffending() {
        await newTabGlobal!.locator('#personal_relationships_community_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async checkPersonalRelationshipsSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Personal relationships and community ✓' })).toBeVisible();
    }

    // Thinking, behaviours and attitudes

    async clickThinkingAndAttitudesLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Thinking, behaviours and attitudes' }).click();
    }

    async tickAwareOfConsequences() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_consequences').check();
    }

    async tickShowsStableBehaviour() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_stable_behaviour').check();
    }

    async tickEngagesInActivities() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_offending_activities').check();
    }

    async tickResilientTowardsPeerPressure() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_peer_pressure').check();
    }

    async tickAbleToSolveProblems() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_problem_solving').check();
    }

    async tickUnderstandsPeoplesViews() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_peoples_views').check();
    }

    async tickNoManipulativeBehaviour() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_manipulative_predatory_behaviour').check();
    }

    async tickNoSexualRiskToOthers() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_risk_sexual_harm-2').check();
    }

    async tickNoSexualPreoccupations() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_sexual_preoccupation-3').check();
    }

    async tickNoSexualInterest() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_offence_related_sexual_interest-3').check();
    }

    async tickSeeksEmotionalIntimacyWithAdults() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_emotional_intimacy-3').check();
    }

    async tickTemperManagement() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_temper_management').check();
    }

    async tickDoesntUseViolence() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_violence_controlling_behaviour').check();
    }

    async tickImpulsiveBehaviour() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_impulsive_behaviour').check();
    }

    async tickPositiveAttitude() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_positive_attitude').check();
    }

    async tickAbleToHaveConstructiveConversations() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_hostile_orientation').check();
    }

    async tickAcceptsSupervision() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_supervision').check();
    }

    async tickDoesntSupportCriminalBehaviour() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_criminal_behaviour').check();
    }

    async tickThinkingBehaviourAlreadyMakingChanges(){
    await newTabGlobal!.locator('#thinking_behaviours_attitudes_changes').check();
    }

    async tickThinkingBehaviourFactors() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_practitioner_analysis_strengths_or_protective_factors').check();
    }

    async fillProtectiveFactorsComment() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_practitioner_analysis_strengths_or_protective_factors_yes_details')
        .fill('Yes comment to thinking and behaviour protective factors');
    }

    async tickThinkingBehaviourRiskOfHarm() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_practitioner_analysis_risk_of_serious_harm-2').check();
    }

    async tickThinkingBehaviourRiskOfReoffending() {
        await newTabGlobal!.locator('#thinking_behaviours_attitudes_practitioner_analysis_risk_of_reoffending-2').check();
    }

    async checkThinkingBehaviourSectionCompleteIconDisplays() {
        await expect (newTabGlobal!.getByRole('link', { name: 'Thinking, behaviours and attitudes ✓' })).toBeVisible();
    }

    // Offence analysis

    async clickOffenceAnalysisLeftNavLink() {
        await newTabGlobal!.getByRole('link', { name: 'Offence analysis' }).click();
    }

    async fillBriefDescription() {
        await newTabGlobal!.locator('#offence_analysis_description_of_offence')
        .fill('This is a brief description for the offence analysis.')
    }

    async tickWeapon() {
        await newTabGlobal!.locator('#offence_analysis_elements-9').check();
    }

    async fillReasonForOffence() {
        await newTabGlobal!.locator('#offence_analysis_reason')
        .fill('This is why this took place.')
    }

    async tickThrillSeeking() {
        await newTabGlobal!.locator('#offence_analysis_motivations-8').check();
    }

    async tickOneOrMorePeople() {
        await newTabGlobal!.locator('#offence_analysis_who_was_the_victim').check();
    }

    async tickVictimIsAStranger() {
        await newTabGlobal!.locator('#offence_analysis_victim_relationship').check();
    }

    async tickVictimAge50to64() {
        await newTabGlobal!.locator('#offence_analysis_victim_age-8').check();
    }

    async tickVictimUnknownGender() {
        await newTabGlobal!.locator('#offence_analysis_victim_sex-4').check();
    }

    async fillVictimsEthnicity() {
        await newTabGlobal!.locator('#offence_analysis_victim_race').fill('White');
        await this.page.waitForTimeout(1000);
    }

    async selectEthnicity() {
        await newTabGlobal!.getByRole('option', { name: 'White - Gypsy or Irish Traveller' }).click();
    }

    async tickNoneInvolved() {
        await newTabGlobal!.locator('#offence_analysis_how_many_involved').check();
    }

    async tickRealizesImpactOnVictims() {
        await newTabGlobal!.locator('#offence_analysis_impact_on_victims').check();
    }

    async tickAcceptsResponsibility() {
        await newTabGlobal!.locator('#offence_analysis_accept_responsibility').check();
    }

    async fillPatternsOfOffending() {
        await newTabGlobal!.locator('#offence_analysis_patterns_of_offending')
        .fill('There are no obvious patterns at this point.')
    }

    async tickNotApplicableEscalation() {
        await newTabGlobal!.locator('#offence_analysis_escalation-3').check();
    }

    async tickNoToriskOfSeriousHarm() {
        await newTabGlobal!.locator('#offence_analysis_risk-2').check();
    }

    async fillDetailsAboutNoRiskOfSeriousHarm() {
        await newTabGlobal!.locator('#offence_analysis_risk_no_details')
        .fill('No risk of serious harm.')
    }

    async tickNoToPerpetratorOfDomestic() {
        await newTabGlobal!.locator('#offence_analysis_perpetrator_of_domestic_abuse-2').check();
    }

    async tickNoToBeingAVictim() {
        await newTabGlobal!.locator('#offence_analysis_victim_of_domestic_abuse-2').check();
    }

    async confirmUserIsOnOffenceAnalysisPage() {
        const heading = newTabGlobal!.getByRole('heading', { name: 'Offence analysis' });
        await expect (heading).toBeVisible();
    }
}