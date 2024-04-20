import { ApiProperty } from '@nestjs/swagger';

export class newAssetDto {
  @ApiProperty({ type: String })
  ID: string;

  @ApiProperty({ type: String })
  Color: string;

  @ApiProperty({ type: Number })
  Size: string;

  @ApiProperty({ type: String })
  Owner: string;

  @ApiProperty({ type: Number })
  AppraisedValue: string;
}
export class UpdateAssetDto {
  @ApiProperty({ type: String })
  Color: string;

  @ApiProperty({ type: Number })
  Size: string;

  @ApiProperty({ type: String })
  Owner: string;

  @ApiProperty({ type: Number })
  AppraisedValue: string;
}