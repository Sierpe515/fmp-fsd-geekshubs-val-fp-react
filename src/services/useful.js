import { useNavigate } from "react-router-dom";

export const redirection = (stageId) => {
    const navigate = useNavigate();
    const stageNavigate = {
        null: "/",
        1: "/stage01",
        2: "/stage02",
        3: "/stage0301",
        4: "/stage0302",
        5: "/stage0303",
        6: "/stage0401",
        7: "/stage0402",
        8: "/stage0403",
        9: "/stage0501",
        10: "/stage0502",
        11: "/stage0503",
        12: "/stage0601",
        13: "/stage0602",
        14: "/stage0603",
    };

    navigate(stageNavigate[stageId]);
}