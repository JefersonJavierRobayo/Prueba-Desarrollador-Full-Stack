import { Injectable } from '@angular/core';
import { PointsResult } from '../models/points.model';

export interface SalesTargetInput {
  executedSalesAmount: number;
  executedUnits: number;
}

export interface PointsCalculationResult {
  salesPercentage: number;
  salesPoints: number;
  salesEquivalentValue: number;

  unitsPercentage: number;
  unitsPoints: number;
  unitsEquivalentValue: number;

  totalPoints: number;
  totalEquivalentValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private readonly PESO_QUOTA = 11000000; // $11.000.000 COP
  private readonly UNIT_QUOTA = 6000;     // 6.000 Unidades
  private readonly POINT_VALUE_COP = 1500; // $1.500 COP por punto

  /**
   * Métodos individuales
   */
  calculatePesoPoints(salesCOP: number): { percentage: number; points: number } {
    const percentage = (salesCOP / this.PESO_QUOTA) * 100;
    const points = this.getPointsBySalesPercentage(percentage);
    return { percentage, points };
  }

  calculateUnitPoints(unitsSold: number): { percentage: number; points: number } {
    const percentage = (unitsSold / this.UNIT_QUOTA) * 100;
    const points = this.getPointsByUnitsCount(unitsSold);
    return { percentage, points };
  }

  /**
   * Devuelve la estructura compatible con PointsResult
   */
  calculateTotalSummary(salesCOP: number, unitsSold: number): PointsResult {
    const pesoResult = this.calculatePesoPoints(salesCOP);
    const unitResult = this.calculateUnitPoints(unitsSold);
    const totalPoints = pesoResult.points + unitResult.points;

    return {
      pesoSalesAmount: salesCOP,
      pesoPercentage: Number(pesoResult.percentage.toFixed(2)),
      pesoPoints: pesoResult.points,
      unitSalesAmount: unitsSold,
      unitPercentage: Number(unitResult.percentage.toFixed(2)),
      unitPoints: unitResult.points,
      totalPoints,
      totalEquivalentCOP: totalPoints * this.POINT_VALUE_COP
    };
  }

  /**
   * Método adaptado para el formulario de la vista (PointsCalculationResult)
   */
  calculatePoints(input: SalesTargetInput): PointsCalculationResult {
    const executedAmount = Math.max(0, input.executedSalesAmount || 0);
    const executedUnits = Math.max(0, input.executedUnits || 0);

    const pesoResult = this.calculatePesoPoints(executedAmount);
    const unitResult = this.calculateUnitPoints(executedUnits);
    const totalPoints = pesoResult.points + unitResult.points;

    return {
      salesPercentage: Number(pesoResult.percentage.toFixed(2)),
      salesPoints: pesoResult.points,
      salesEquivalentValue: pesoResult.points * this.POINT_VALUE_COP,

      unitsPercentage: Number(unitResult.percentage.toFixed(2)),
      unitsPoints: unitResult.points,
      unitsEquivalentValue: unitResult.points * this.POINT_VALUE_COP,

      totalPoints,
      totalEquivalentValue: totalPoints * this.POINT_VALUE_COP
    };
  }

  /**
   * Reglas de negocio privadas
   */
  private getPointsBySalesPercentage(percentage: number): number {
    if (percentage >= 80) return 100;
    if (percentage >= 50) return 70;
    if (percentage >= 30) return 40;
    if (percentage >= 10) return 20;
    return 0;
  }

  private getPointsByUnitsCount(units: number): number {
    if (units >= 4000) return 150;
    if (units >= 2000) return 100;
    if (units >= 1000) return 50;
    return 0;
  }
}
