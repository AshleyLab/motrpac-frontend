import {
  TOGGLE_WEIGHT_PLOT,
  TOGGLE_BODY_FAT_PLOT,
  TOGGLE_VO2_PLOT,
  TOGGLE_LACTATE_PLOT,
  SAVE_GENE_SEARCH_TERM,
  GENE_SEARCH_INPUT_CHANGE,
  GENE_SEARCH_SUBMIT,
  GENE_SEARCH_FAILURE,
  GENE_SEARCH_SUCCESS,
} from './analysisActions';

export const defaultAnalysisState = {
  match: {
    params: {
      subjectType: '',
    },
  },
  currentAnalysis: '',
  currentAnalysisTitle: '',
  currentSubAnalysis: '',
  currentSubAnalysisTitle: '',
  depth: 0,
  analysisSelected: false,
  subAnalysisSelected: false,
  weightPlot: 'one_week_program',
  bodyFatPlot: 'one_week_program',
  vo2Plot: 'one_week_program',
  lactatePlot: 'one_week_program',
  savedGeneSearches: [],
  geneSearchPayload: {},
  geneSearchError: null,
  geneSearchInput: '',
  geneSymbol: '',
  isGeneSearchInProgress: false,
};

export default function AnalysisReducer(
  state = { ...defaultAnalysisState },
  action
) {
  switch (action.type) {
    case 'ANALYSIS_SELECT':
      return {
        ...state,
        currentAnalysis: action.analysis,
        currentAnalysisTitle: action.analysisTitle,
        analysisSelected: true,
        depth: 1,
      };
    case 'SUBANALYSIS_SELECT':
      return {
        ...state,
        currentSubAnalysis: action.subAnalysis,
        currentSubAnalysisTitle: action.subAnalysisTitle,
        subAnalysisSelected: true,
        depth: 2,
      };
    case 'GO_BACK':
      return {
        ...state,
        depth: state.depth > 0 ? state.depth - 1 : 0,
      };
    case 'RESET_DEPTH':
      return {
        ...state,
        currentAnalysis: '',
        currentAnalysisTitle: '',
        currentSubAnalysis: '',
        currentSubAnalysisTitle: '',
        depth: 0,
        analysisSelected: false,
        subAnalysisSelected: false,
      };
    case TOGGLE_WEIGHT_PLOT:
      return {
        ...state,
        weightPlot: action.weightPlot,
      };
    case TOGGLE_BODY_FAT_PLOT:
      return {
        ...state,
        bodyFatPlot: action.bodyFatPlot,
      };
    case TOGGLE_VO2_PLOT:
      return {
        ...state,
        vo2Plot: action.vo2Plot,
      };
    case TOGGLE_LACTATE_PLOT:
      return {
        ...state,
        lactatePlot: action.lactatePlot,
      };
    // Save list of successful searched gene symbols
    case SAVE_GENE_SEARCH_TERM: {
      const newList = [...state.savedGeneSearches];
      if (newList.indexOf(action.geneSymbol) < 0) {
        newList.push(action.geneSymbol);
      }

      return {
        ...state,
        savedGeneSearches: newList,
      };
    }
    // Handle form input change event
    case GENE_SEARCH_INPUT_CHANGE:
      return {
        ...state,
        geneSearchInput: action.inputValue,
        geneSearchError: null,
      };

    // Handle form submit event
    case GENE_SEARCH_SUBMIT:
      return {
        ...state,
        geneSymbol: action.geneSymbol,
        isGeneSearchInProgress: true,
        geneSearchError: null,
      };

    // Handle form submit error
    case GENE_SEARCH_FAILURE:
      return {
        ...state,
        geneSearchError: action.geneSearchError,
        isGeneSearchInProgress: false,
      };

    // Hanlde query response
    case GENE_SEARCH_SUCCESS:
      return {
        ...state,
        geneSearchPayload: action.geneSearchPayload,
        isGeneSearchInProgress: false,
        geneSearchError: null,
      };
    default:
      return state;
  }
}
