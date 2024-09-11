import { VisitsReducerResponse } from "../../reducers/visits-reducer.models"

export type CatalogVisitsApiResponse = VisitsReducerResponse & { cv: number }
