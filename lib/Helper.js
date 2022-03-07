export const BASE_URL = "https://gamequester.com/api/";
const PROFESSIONS = 1;
const SKILLS = 2;
const WORK_HISTORY = 3;
import Cookie from "cookie-cutter";


 export function url(){
    return {
        "USER":BASE_URL+"user",
        "LOGIN":BASE_URL+"login",
        "LOGOUT":BASE_URL+"logout",
        "COUNTRIES":BASE_URL+"countries",
        "PROFESSIONS":BASE_URL+"professions",
        "CATEGORIES_PROFESSIONS":BASE_URL+"get_categories/"+PROFESSIONS,
        "CATEGORIES_SKILLS":BASE_URL+"get_categories/"+SKILLS,
        "CATEGORIES_WORKHISTORY":BASE_URL+"get_categories/"+WORK_HISTORY,
        "SUB_CATEGORIES":BASE_URL+"get_subcategories/",
        "DEGREES_LIST":BASE_URL+"get_degree_list",
        "SECTION_LIST":BASE_URL+"get_section_list",
        "SECTION":BASE_URL+"get_section",
        "RESUME_SECTION":BASE_URL+"get_resume_section",
        "RESUME_LINKS":BASE_URL+"get_resume_links",
        "GET_TEMPLATES":BASE_URL+"get_templates",
        "SAVE_PASSWORD":BASE_URL+"save_password",
        "CREATE_RESUME":BASE_URL+"create_resume",
        "GET_RESUME":BASE_URL+"get_resume",
        "UPDATE_RESUME_STYLE":BASE_URL+"update_resume_style",
        "UPDATE_BASIC_INFO":BASE_URL+"update_basicInfo",
        "UPDATE_PROFESSION_SUMMERY":BASE_URL+"update_profession_summery",
        "UPDATE_SKILLS":BASE_URL+"update_skills",
        "UPDATE_WORKHISTORY":BASE_URL+"update_workhistory",
        "UPDATE_EDUCATION":BASE_URL+"update_education",
        "UPDATE_RESUME_LINKS":BASE_URL+"update_resume_links",
        "UPDATE_RESUME_SECTION":BASE_URL+"update_resume_section",
        "GET_USER_RESUMES":BASE_URL+"get_user_resumes",
        "USER_RESUME":BASE_URL+"user_resume",
        "MAKE_RESUME_PRIMARY":BASE_URL+"make_resume_primary",
        "DELETE_RESUME":BASE_URL+"delete_resume",
        "GET_USER_MEMBERSHIP":BASE_URL+"get_user_membership",
        "PURCHASED_NEW_SUBSCRIPTION":BASE_URL+"purchased_new_subscription",
    }
}
 export function page_route(){
    return {
        "EXPERIENCE":"experience",
        "RESUME_TEMPLATE":"resume-template",
        "BASIC_INFORMATION":"basic-information",
        "WORK_HISTORY":"work-history",
        "WORK_HISTORY_TASK":"work-history-task",
        "WORK_HISTORY_SUMMERY":"work-history-summery",
        "EDUCATION":"education",
        "EDUCATION_SUMMERY":"education-summery",
        "SKILLS":"skills",
        "PROFESSIONAL_SUMMERY":"professional-summery",
        "ADDITIONAL_SECTION":"additional-section",
        "SAVE_PASSWORD":"save-password",
        "RESUME":"resume",
    }
}


// Remove All Cookies 
export function remove_cookies(){
    Cookie.set("template_id", "");
    Cookie.set("basic_information", "");
    Cookie.set("work_summery", "");
    Cookie.set("education_summery", "");
    Cookie.set("skill_content", "");
    Cookie.set("profession_content", "");
    Cookie.set("new_record", "");
    Cookie.set("selected_content", "");
    Cookie.set("work_history_content", "");
    Cookie.set("work_history", "");
    Cookie.set("education_information", "");
    Cookie.set("education_information", "");
    Cookie.set("links", "");
    Cookie.set("sections", "");
    Cookie.set("custom_title", "");
    return true;
}

export async function update_resume(postData,apiURL){
    const response = await fetch(apiURL, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    const res = await response.json();
    return res;
}