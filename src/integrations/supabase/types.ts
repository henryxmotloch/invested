export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Purchase: {
        Row: {
          CustomerID: string | null
          PurchaseDate: string | null
          PurchaseID: string
          ReportID: string | null
          TransactionID: string | null
        }
        Insert: {
          CustomerID?: string | null
          PurchaseDate?: string | null
          PurchaseID: string
          ReportID?: string | null
          TransactionID?: string | null
        }
        Update: {
          CustomerID?: string | null
          PurchaseDate?: string | null
          PurchaseID?: string
          ReportID?: string | null
          TransactionID?: string | null
        }
        Relationships: []
      }
      Report: {
        Row: {
          AccessLevel: string | null
          Description: string | null
          FilePath: string | null
          Price: number | null
          PublishedDate: string | null
          ReportID: string
          ReportName: string | null
        }
        Insert: {
          AccessLevel?: string | null
          Description?: string | null
          FilePath?: string | null
          Price?: number | null
          PublishedDate?: string | null
          ReportID: string
          ReportName?: string | null
        }
        Update: {
          AccessLevel?: string | null
          Description?: string | null
          FilePath?: string | null
          Price?: number | null
          PublishedDate?: string | null
          ReportID?: string
          ReportName?: string | null
        }
        Relationships: []
      }
      School: {
        Row: {
          DateAdded: string | null
          EntranceDifficulty: string | null
          GraduateEmployabilityScore: number | null
          InstitutionType: string | null
          IsActive: boolean | null
          Location: string | null
          PostgraduateTuition: number | null
          SchoolID: string
          SchoolName: string | null
          UndergraduateTuition: number | null
          WebsiteURL: string | null
          WorldRanking: number | null
        }
        Insert: {
          DateAdded?: string | null
          EntranceDifficulty?: string | null
          GraduateEmployabilityScore?: number | null
          InstitutionType?: string | null
          IsActive?: boolean | null
          Location?: string | null
          PostgraduateTuition?: number | null
          SchoolID: string
          SchoolName?: string | null
          UndergraduateTuition?: number | null
          WebsiteURL?: string | null
          WorldRanking?: number | null
        }
        Update: {
          DateAdded?: string | null
          EntranceDifficulty?: string | null
          GraduateEmployabilityScore?: number | null
          InstitutionType?: string | null
          IsActive?: boolean | null
          Location?: string | null
          PostgraduateTuition?: number | null
          SchoolID?: string
          SchoolName?: string | null
          UndergraduateTuition?: number | null
          WebsiteURL?: string | null
          WorldRanking?: number | null
        }
        Relationships: []
      }
      Subscription: {
        Row: {
          CustomerID: string | null
          EndDate: string | null
          PaymentStatus: boolean | null
          PlanID: string | null
          StartDate: string | null
          Status: string | null
          SubscriptionID: string
        }
        Insert: {
          CustomerID?: string | null
          EndDate?: string | null
          PaymentStatus?: boolean | null
          PlanID?: string | null
          StartDate?: string | null
          Status?: string | null
          SubscriptionID: string
        }
        Update: {
          CustomerID?: string | null
          EndDate?: string | null
          PaymentStatus?: boolean | null
          PlanID?: string | null
          StartDate?: string | null
          Status?: string | null
          SubscriptionID?: string
        }
        Relationships: []
      }
      SubscriptionPlan: {
        Row: {
          DateAdded: string | null
          Description: string | null
          Duration_Month: number | null
          IsActive: boolean | null
          PlanFeature: string | null
          PlanID: string
          PlanName: string | null
          Price: number | null
        }
        Insert: {
          DateAdded?: string | null
          Description?: string | null
          Duration_Month?: number | null
          IsActive?: boolean | null
          PlanFeature?: string | null
          PlanID: string
          PlanName?: string | null
          Price?: number | null
        }
        Update: {
          DateAdded?: string | null
          Description?: string | null
          Duration_Month?: number | null
          IsActive?: boolean | null
          PlanFeature?: string | null
          PlanID?: string
          PlanName?: string | null
          Price?: number | null
        }
        Relationships: []
      }
      Users: {
        Row: {
          "Budget Range": string | null
          "Display name": string | null
          Email: string | null
          "Field of Study": string | null
          "Payment Option": string | null
          "Preferred Campus Location": string | null
          "Program Type": string | null
          "User ID": string
        }
        Insert: {
          "Budget Range"?: string | null
          "Display name"?: string | null
          Email?: string | null
          "Field of Study"?: string | null
          "Payment Option"?: string | null
          "Preferred Campus Location"?: string | null
          "Program Type"?: string | null
          "User ID": string
        }
        Update: {
          "Budget Range"?: string | null
          "Display name"?: string | null
          Email?: string | null
          "Field of Study"?: string | null
          "Payment Option"?: string | null
          "Preferred Campus Location"?: string | null
          "Program Type"?: string | null
          "User ID"?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
